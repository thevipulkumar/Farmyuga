import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { blurFor } from "@/lib/images";
import { categoryShortLabel, productPhoto, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  /** The first row above the fold can skip lazy loading. */
  eager?: boolean;
  className?: string;
};

export function ProductCard({ product, eager = false, className }: ProductCardProps) {
  const photo = productPhoto(product);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-leaf hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
          placeholder="blur"
          blurDataURL={blurFor(photo.tone)}
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant={product.availability === "daily" ? "green" : "amber"}>
            {product.availability === "daily" ? "Available daily" : "Seasonal"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold leading-snug text-charcoal">
            {product.name}{" "}
            <span lang="hi" className="font-medium text-muted">
              {product.hindi}
            </span>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{product.blurb}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <Badge variant="outline">{categoryShortLabel(product.category)}</Badge>
          <Link
            href={`/contact?item=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green transition-colors duration-200 hover:text-forest"
          >
            Ask Price
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
