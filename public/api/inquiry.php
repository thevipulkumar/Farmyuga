<?php
/**
 * FARMYUGA — inquiry endpoint
 * =============================================================================
 * The website is a static export, so there is no Node server in production.
 * This PHP script replaces the old Next.js route handler: it validates the
 * submission, drops spam, emails the lead and optionally fires a WhatsApp
 * alert. It lives in public/ so `next build` copies it into out/api/.
 *
 * -----------------------------------------------------------------------------
 * OWNER — CONFIGURE THIS BLOCK, then upload. Nothing else needs editing.
 * -----------------------------------------------------------------------------
 */

// Where leads are delivered.
$LEAD_TO_EMAIL = 'hello@farmyuga.com';

// The From address. MUST be a mailbox on your own domain or the mail will be
// treated as spoofed and land in junk. Create it in hPanel → Emails.
$LEAD_FROM_EMAIL = 'no-reply@farmyuga.com';

// Optional WhatsApp alert (Meta Cloud API). Leave the token empty to skip.
// See README for how to get these and why a template is usually required.
$WHATSAPP_TOKEN           = '';
$WHATSAPP_PHONE_NUMBER_ID = '';
$WHATSAPP_ALERT_TO        = '917209909097'; // digits only, no +
$WHATSAPP_TEMPLATE_NAME   = '';             // approved template name, or ''

// Keeps a local copy of every lead as a safety net. Set to null to disable.
// NOTE: this path is deliberately ONE LEVEL ABOVE public_html, so the file is
// not reachable over the web. Customer names and phone numbers live in here —
// never move it inside the web root.
$LEAD_LOG = __DIR__ . '/../../farmyuga-inquiries.log';

/* ========================= no edits needed below ========================== */

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Use POST to submit an inquiry.']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON body']);
    exit;
}

/** Trim and hard-limit any incoming string. */
function field(array $d, string $key, int $max = 1200): string
{
    $v = isset($d[$key]) && is_string($d[$key]) ? trim($d[$key]) : '';
    return mb_substr($v, 0, $max);
}

$lead = [
    'variant'        => field($data, 'variant', 20),
    'name'           => field($data, 'name', 80),
    'phone'          => field($data, 'phone', 20),
    'email'          => field($data, 'email', 120),
    'audience'       => field($data, 'audience', 20),
    'businessName'   => field($data, 'businessName', 120),
    'businessType'   => field($data, 'businessType', 60),
    'monthlyVolume'  => field($data, 'monthlyVolume', 40),
    'locality'       => field($data, 'locality', 60),
    'deliveryTime'   => field($data, 'deliveryTime', 80),
    'requirement'    => field($data, 'requirement', 1200),
];

// Honeypot: hidden from real users, so anything in it is a bot. Report success
// so the bot learns nothing, and discard the submission.
if (field($data, 'website', 200) !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

/* ----------------------------- validation -------------------------------- */

$errors = [];

if (mb_strlen($lead['name']) < 2) {
    $errors[] = ['path' => 'name', 'message' => 'Please enter your name'];
}

// Indian mobile: 10 digits starting 6-9, optional +91 or 0 prefix.
$phoneDigits = preg_replace('/[\s\-().]/', '', $lead['phone']);
if (!preg_match('/^(?:\+?91|0)?[6-9]\d{9}$/', $phoneDigits)) {
    $errors[] = ['path' => 'phone', 'message' => 'Enter a valid 10-digit Indian mobile number'];
}
$lead['phone'] = $phoneDigits;

if ($lead['email'] !== '' && !filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = ['path' => 'email', 'message' => 'Enter a valid email address'];
}

if (!in_array($lead['audience'], ['business', 'household'], true)) {
    $errors[] = ['path' => 'audience', 'message' => "Tell us who we're supplying"];
}

if ($lead['audience'] === 'business' && $lead['businessName'] === '') {
    $errors[] = ['path' => 'businessName', 'message' => 'Please add your business name'];
}

if ($lead['locality'] === '') {
    $errors[] = ['path' => 'locality', 'message' => 'Choose your locality'];
}

if (mb_strlen($lead['requirement']) < 10) {
    $errors[] = ['path' => 'requirement', 'message' => 'A line or two about what you need helps us quote accurately'];
}

if ($lead['deliveryTime'] === '') {
    $errors[] = ['path' => 'deliveryTime', 'message' => 'Pick a delivery window'];
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Validation failed', 'issues' => $errors]);
    exit;
}

/* ------------------------------ formatting -------------------------------- */

$labels = [
    'name'          => 'Name',
    'phone'         => 'Phone / WhatsApp',
    'email'         => 'Email',
    'audience'      => 'Customer type',
    'businessName'  => 'Business name',
    'businessType'  => 'Business type',
    'monthlyVolume' => 'Monthly volume',
    'locality'      => 'Locality',
    'deliveryTime'  => 'Preferred delivery',
    'requirement'   => 'Requirement',
];

$receivedAt = (new DateTime('now', new DateTimeZone('Asia/Kolkata')))->format('d M Y, g:i a');

$rowsHtml = '';
foreach ($labels as $key => $label) {
    if (($lead[$key] ?? '') === '') {
        continue;
    }
    $value     = htmlspecialchars($lead[$key], ENT_QUOTES, 'UTF-8');
    $rowsHtml .= '<tr><td style="padding:10px 16px;border-bottom:1px solid #E3EAE4;font-weight:600;color:#14532D;white-space:nowrap;vertical-align:top">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
        . '</td><td style="padding:10px 16px;border-bottom:1px solid #E3EAE4;color:#14181A">'
        . nl2br($value) . '</td></tr>';
}
$rowsHtml .= '<tr><td style="padding:10px 16px;font-weight:600;color:#14532D">Received</td>'
    . '<td style="padding:10px 16px;color:#14181A">' . $receivedAt . ' IST</td></tr>';

$heading = $lead['variant'] === 'bulk'
    ? 'New BULK inquiry'
    : ($lead['variant'] === 'home' ? 'New home delivery inquiry' : 'New inquiry');

$subject = $lead['variant'] === 'bulk'
    ? 'Bulk inquiry — ' . ($lead['businessName'] ?: $lead['name']) . ' (' . $lead['locality'] . ')'
    : 'Website inquiry — ' . $lead['name'] . ' (' . $lead['locality'] . ')';

$html = '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#F7F9F4;padding:24px">'
    . '<div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E3EAE4;border-radius:16px;overflow:hidden">'
    . '<div style="background:#16A34A;color:#fff;padding:20px 24px">'
    . '<div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.85">Farmyuga website</div>'
    . '<div style="font-size:22px;font-weight:800;margin-top:4px">' . $heading . '</div></div>'
    . '<table style="width:100%;border-collapse:collapse;font-size:15px">' . $rowsHtml . '</table>'
    . '<div style="padding:16px 24px;background:#F7F9F4;font-size:13px;color:#5C6B60">Reply to this email, or call '
    . htmlspecialchars($lead['phone'], ENT_QUOTES, 'UTF-8') . ' directly.</div>'
    . '</div></div>';

/* -------------------------- safety-net log file --------------------------- */

if ($LEAD_LOG) {
    @file_put_contents(
        $LEAD_LOG,
        '[' . gmdate('c') . '] ' . json_encode($lead, JSON_UNESCAPED_UNICODE) . "\n",
        FILE_APPEND | LOCK_EX
    );
}

/* --------------------------------- email ---------------------------------- */

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: Farmyuga Website <' . $LEAD_FROM_EMAIL . '>';
if ($lead['email'] !== '') {
    $headers[] = 'Reply-To: ' . $lead['name'] . ' <' . $lead['email'] . '>';
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

$emailSent = @mail(
    $LEAD_TO_EMAIL,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $html,
    implode("\r\n", $headers),
    '-f' . $LEAD_FROM_EMAIL
);

/* ------------------------------- WhatsApp --------------------------------- */

$whatsappSent = false;

if ($WHATSAPP_TOKEN !== '' && $WHATSAPP_PHONE_NUMBER_ID !== '' && $WHATSAPP_ALERT_TO !== '') {
    $kind    = $lead['variant'] === 'bulk' ? 'BULK' : ($lead['variant'] === 'home' ? 'HOME' : 'NEW');
    $who     = $lead['businessName'] !== '' ? $lead['name'] . ' (' . $lead['businessName'] . ')' : $lead['name'];
    $summary = $kind . " inquiry — Farmyuga\n"
        . $who . ' · ' . $lead['phone'] . "\n"
        . $lead['locality'] . ' · ' . $lead['deliveryTime'] . "\n"
        . '"' . mb_substr($lead['requirement'], 0, 220) . '"';

    // Meta only allows free-form text inside a 24-hour reply window, so a
    // business-initiated alert normally needs an approved template.
    $body = $WHATSAPP_TEMPLATE_NAME !== ''
        ? [
            'messaging_product' => 'whatsapp',
            'to'                => $WHATSAPP_ALERT_TO,
            'type'              => 'template',
            'template'          => [
                'name'       => $WHATSAPP_TEMPLATE_NAME,
                'language'   => ['code' => 'en'],
                'components' => [[
                    'type'       => 'body',
                    'parameters' => [['type' => 'text', 'text' => $summary]],
                ]],
            ],
        ]
        : [
            'messaging_product' => 'whatsapp',
            'to'                => $WHATSAPP_ALERT_TO,
            'type'              => 'text',
            'text'              => ['body' => $summary],
        ];

    $ch = curl_init('https://graph.facebook.com/v21.0/' . $WHATSAPP_PHONE_NUMBER_ID . '/messages');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $WHATSAPP_TOKEN,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS     => json_encode($body),
    ]);
    $response = curl_exec($ch);
    $status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $whatsappSent = $status >= 200 && $status < 300;
    if (!$whatsappSent) {
        error_log('[farmyuga] whatsapp alert failed (' . $status . '): ' . $response);
    }
}

/* -------------------------------- respond --------------------------------- */

if (!$emailSent) {
    error_log('[farmyuga] mail() failed — lead saved to ' . $LEAD_LOG);
}

// Always report success to the visitor. The lead is already on disk, and an
// error screen after they have typed everything out loses the enquiry for good.
echo json_encode(['ok' => true]);
