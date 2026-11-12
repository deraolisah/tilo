// pages/ProductDetails.jsx
import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import products from "../assets/data";
import useCartStore from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import ProductCard from "../components/common/ProductCard";
import { cn } from "../lib/cn";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const wished = useWishlistStore((s) =>
    s.items.some((i) => i.id === Number(id))
  );
  const toggleWish = useWishlistStore((s) => s.toggle);

  const product = products.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSelectedColor(0);
    setSelectedSize(null);
    setQty(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const related = useMemo(
    () =>
      products
        .filter((p) => p.id !== Number(id) && p.category === product?.category)
        .slice(0, 4),
    [id, product]
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl">Piece not found</h1>
        <p className="text-ink/60 text-center">
          The item you're looking for may have moved or sold out.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-2 px-6 py-2.5 rounded-full bg-ink text-bone text-sm hover:bg-ink/90 transition"
        >
          Back to shop
        </button>
      </div>
    );
  }

  const isOut = product.stock === 0;
  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const hasSizes = product.sizes?.length > 0;
  const canAdd = !isOut && (!hasSizes || selectedSize);

  const handleAdd = () => {
    if (!canAdd) return;
    addItem(
      {
        ...product,
        selectedColor: product.colors?.[selectedColor]?.name,
        selectedSize,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-bone min-h-screen">
      <div className="container py-6 md:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-ink/60 mb-6 flex-wrap">
          <Link to="/" className="hover:text-ink transition">Home</Link>
          <ChevronRight size={14} strokeWidth={1.5} />
          <Link to="/shop" className="hover:text-ink transition">Shop</Link>
          <ChevronRight size={14} strokeWidth={1.5} />
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-ink transition"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} strokeWidth={1.5} />
          <span className="text-ink truncate max-w-45">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* GALLERY */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-sand aspect-4/5">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-clay text-white text-[11px] uppercase tracking-widest px-3 py-1 rounded-full">
                  −{discount}%
                </span>
              )}
              <button
                onClick={() => toggleWish(product)}
                className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition shadow-sm"
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={16}
                  strokeWidth={1.5}
                  className={cn(wished && "fill-clay text-clay")}
                />
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hidden">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-20 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition",
                      activeImage === i
                        ? "border-ink"
                        : "border-transparent hover:border-sand"
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50 mb-2">
              {product.subCategory || product.category}
            </p>
            <h1 className="text-3xl md:text-4xl mb-3 leading-tight font-medium">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={14}
                    className={cn(
                      n <= Math.round(product.rating)
                        ? "fill-ink text-ink"
                        : "text-ink/20"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-ink/60">
                {product.rating} · {product.reviewCount} reviews
              </span>
              <span className="text-sm text-ink/40">
                {product.soldCount}+ sold
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-medium">
                {product.currency}
                {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-ink/40 line-through">
                  {product.currency}
                  {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-ink/70 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">
                    Colour:{" "}
                    <span className="text-ink/60 font-normal">
                      {product.colors[selectedColor].name}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      title={c.name}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 transition p-0.5",
                        selectedColor === i
                          ? "border-ink"
                          : "border-transparent hover:border-ink/20"
                      )}
                    >
                      <span
                        className="block w-full h-full rounded-full"
                        style={{ background: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {hasSizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Size</p>
                  <button className="text-xs text-ink/60 underline underline-offset-4 hover:text-ink">
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => s.inStock && setSelectedSize(s.label)}
                      disabled={!s.inStock}
                      className={cn(
                        "min-w-12 px-4 py-2 rounded-full border text-sm transition",
                        selectedSize === s.label
                          ? "bg-ink text-bone border-ink"
                          : "bg-white border-sand hover:border-ink",
                        !s.inStock &&
                          "opacity-40 line-through cursor-not-allowed hover:border-sand"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex items-center border border-sand rounded-full bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 grid place-items-center hover:bg-sand/40 rounded-l-full transition"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-11 grid place-items-center hover:bg-sand/40 rounded-r-full transition"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!canAdd}
                className={cn(
                  "flex-1 h-11 rounded-full text-sm font-medium transition",
                  canAdd
                    ? "bg-ink text-bone hover:bg-ink/90"
                    : "bg-ink/40 text-bone cursor-not-allowed"
                )}
              >
                {isOut
                  ? "Sold Out"
                  : hasSizes && !selectedSize
                  ? "Select a size"
                  : added
                  ? "Added ✓"
                  : `Add to Cart — ${product.currency}${(
                      product.price * qty
                    ).toLocaleString()}`}
              </button>

              <button
                onClick={() => toggleWish(product)}
                className="w-11 h-11 grid place-items-center rounded-full border border-sand bg-white hover:border-ink transition"
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={16}
                  strokeWidth={1.5}
                  className={cn(wished && "fill-clay text-clay")}
                />
              </button>
            </div>

            {lowStock && (
              <p className="text-sm text-clay mb-4">
                Only {product.stock} left in stock
              </p>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-sand mb-6">
              <TrustBadge icon={<Truck size={16} />} label="Free shipping" sub="Above ₦100k" />
              <TrustBadge icon={<RotateCcw size={16} />} label="14-day returns" sub="Hassle free" />
              <TrustBadge icon={<ShieldCheck size={16} />} label="Authentic" sub="Guaranteed" />
            </div>

            {/* Tabs */}
            <div className="border-b border-sand flex gap-6 mb-4">
              {["description", "highlights", "shipping"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "pb-2 text-sm capitalize transition border-b-2 -mb-px",
                    tab === t
                      ? "border-ink text-ink"
                      : "border-transparent text-ink/50 hover:text-ink"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="text-sm text-ink/70 leading-relaxed">
              {tab === "description" && <p>{product.description}</p>}
              {tab === "highlights" && (
                <ul className="list-disc pl-5 space-y-1">
                  {product.highlights?.map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}
              {tab === "shipping" && (
                <ul className="space-y-2">
                  <li>
                    <b>Delivery:</b> {product.shipping?.estimatedDays}
                  </li>
                  <li>
                    <b>Free shipping on orders above</b>{" "}
                    {product.currency}
                    {product.shipping?.freeAbove.toLocaleString()}
                  </li>
                  <li>
                    <b>Returns:</b> {product.shipping?.returnsDays} days, unused
                    items in original packaging
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 mb-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-2">
                  You may also like
                </p>
                <h2 className="text-2xl md:text-3xl font-medium">
                  More from {product.category}
                </h2>
              </div>
              <Link
                to={`/shop?category=${product.category}`}
                className="text-sm underline underline-offset-4 hover:text-ink/60 transition"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const TrustBadge = ({ icon, label, sub }) => (
  <div className="flex flex-col items-center text-center gap-1">
    <div className="w-8 h-8 grid place-items-center rounded-full bg-sand/70 text-ink">
      {icon}
    </div>
    <p className="text-xs font-medium">{label}</p>
    <p className="text-[10px] text-ink/50">{sub}</p>
  </div>
);

export default ProductDetails;