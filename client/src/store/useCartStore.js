// store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) =>
        set((state) => {
          // Same product + same color + same size => increase qty
          const key = (i) =>
            `${i.id}-${i.selectedColor ?? ""}-${i.selectedSize ?? ""}`;
          const target = key(product);
          const existing = state.items.find((i) => key(i) === target);

          if (existing) {
            return {
              items: state.items.map((i) =>
                key(i) === target ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, qty }] };
        }),

      removeItem: (index) =>
        set((state) => ({
          items: state.items.filter((_, i) => i !== index),
        })),

      incrementQty: (index) =>
        set((state) => ({
          items: state.items.map((i, idx) =>
            idx === index ? { ...i, qty: i.qty + 1 } : i
          ),
        })),

      decrementQty: (index) =>
        set((state) => ({
          items: state.items
            .map((i, idx) =>
              idx === index ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: "shop-cart" }
  )
);

export default useCartStore;