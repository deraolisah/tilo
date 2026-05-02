import React from "react";
import useCartStore from "../../store/useCartStore";

const Cart = () => {
  const { items, clearCart } = useCartStore();

  return (
    <div className="bg-white p-6 rounded shadow w-full">
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