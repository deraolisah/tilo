// components/common/ProductCard.jsx
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import useCartStore from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { cn } from "../../lib/cn";

const ProductCard = ({ product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const wished = useWishlistStore((s) =>
    s.items.some((i) => i.id === product.id)
  );
  const toggleWish = useWishlistStore((s) => s.toggle);

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;
  const isNew = product.tags?.includes("new");
  const isOut = product.stock === 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOut) addItem(product);
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWish(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-sand aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          draggable="false"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
            isOut && "opacity-60"
          )}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-ink text-bone text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-clay text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              −{discount}%
            </span>
          )}
          {isOut && (
            <span className="bg-white text-ink text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWish}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition shadow-sm"
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            className={cn(wished && "fill-clay text-clay")}
          />
        </button>

        {/* Add to cart */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAdd}
            disabled={isOut}
            className="w-full py-2.5 rounded-full bg-ink text-bone text-sm font-medium hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isOut ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-widest text-ink/50">
            {product.category}
          </p>
          <div className="flex items-center gap-1 text-ink/60">
            <Star size={12} className="fill-ink text-ink" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-lg leading-snug line-clamp-1">{product.name}</h3>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-medium text-ink">
            {product.currency || "₦"}
            {product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-ink/40 line-through">
              {product.currency || "₦"}
              {product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-3 h-3 rounded-full border border-ink/10"
                style={{ background: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-ink/50">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;