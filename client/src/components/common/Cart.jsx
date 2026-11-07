import React from "react";
import useCartStore from "../../store/useCartStore";

const Cart = ({ cartOpen }) => {
  const { items, clearCart } = useCartStore();

  return (
    <div className={`bg-white py-6 md:p-4 rounded w-full transition-all duration-600 overflow-hidden ${cartOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
      <h2 className="text-3xl font-semibold">My Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      <button className="btn" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;