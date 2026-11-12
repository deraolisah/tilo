// pages/Shop.jsx
import { useMemo, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import products from "../assets/data";
import ProductCard from "../components/common/ProductCard";
import { cn } from "../lib/cn";

const PAGE_SIZE = 9;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const category = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "featured";
  const query = searchParams.get("q") || "";
  const inStockOnly = searchParams.get("stock") === "1";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "All" || value === "featured" || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
    setPage(1);
  };

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    []
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQ =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchStock = !inStockOnly || p.stock > 0;
      return matchCat && matchQ && matchStock;
    });

    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => b.id - a.id); break;
      default: break;
    }
    return [...list];
  }, [category, query, sortBy, inStockOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="bg-bone min-h-screen">
      {/* Hero */}
      <div className="bg-ink text-bone">
        <div className="container py-16 md:py-24 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-bone/60 mb-3">
            The Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-medium mb-4">
            {category === "All" ? "All Pieces" : category}
          </h1>
          <p className="text-bone/70 max-w-xl mx-auto text-sm md:text-base">
            Thoughtfully crafted essentials, designed to be worn for years — not seasons.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hidden">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => updateParam("category", c)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm whitespace-nowrap transition border",
                  category === c
                    ? "bg-ink text-bone border-ink"
                    : "bg-white text-ink border-sand hover:border-ink"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 md:w-64 min-w-45">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => updateParam("q", e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-8 py-2 rounded-full border border-sand bg-white text-sm focus:outline-none focus:border-ink transition"
              />
              {query && (
                <button
                  onClick={() => updateParam("q", "")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="px-4 py-2 rounded-full border border-sand bg-white text-sm flex items-center gap-2 hover:border-ink transition"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="appearance-none pl-4 pr-9 py-2 rounded-full border border-sand bg-white text-sm focus:outline-none focus:border-ink cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50"
              />
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-8 p-5 rounded-2xl bg-white border border-sand flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) =>
                  updateParam("stock", e.target.checked ? "1" : "")
                }
                className="accent-ink"
              />
              In stock only
            </label>
            <button
              onClick={() => {
                setSearchParams({}, { replace: true });
                setPage(1);
              }}
              className="text-sm text-ink/60 hover:text-ink underline underline-offset-4"
            >
              Clear all
            </button>
          </div>
        )}

        <p className="text-sm text-ink/50 mb-6">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>

        {/* Grid */}
        {paginated.length === 0 ? (
          <EmptyState onClear={() => setSearchParams({}, { replace: true })} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 mb-8 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-full border border-sand bg-white text-sm disabled:opacity-40 hover:border-ink transition"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={cn(
                  "w-10 h-10 rounded-full text-sm border transition",
                  n === page
                    ? "bg-ink text-bone border-ink"
                    : "bg-white border-sand hover:border-ink"
                )}
              >
                {n}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-full border border-sand bg-white text-sm disabled:opacity-40 hover:border-ink transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ onClear }) => (
  <div className="py-24 text-center">
    <p className="text-3xl mb-3 font-medium">Nothing here (yet)</p>
    <p className="text-ink/60 mb-6">Try adjusting your filters or search.</p>
    <button
      onClick={onClear}
      className="px-6 py-2.5 rounded-full bg-ink text-bone text-sm hover:bg-ink/90 transition"
    >
      Clear filters
    </button>
  </div>
);

export default Shop;