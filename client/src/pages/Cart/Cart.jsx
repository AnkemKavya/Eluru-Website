import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

import EmptyCard from "../../components/EmptyCard/EmptyCard";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(data);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () =>
      window.removeEventListener("cartUpdated", loadCart);
  }, []);

  /* Empty Cart */

  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <header className="cart-header">
          <button onClick={() => navigate(-1)}>
            <HiOutlineArrowLeft />
          </button>

          <h2>My Cart</h2>
        </header>

        <div className="empty-cart">
          <EmptyCard
            type="cart"
            title="Your Cart is Empty"
            subtitle="Add some fresh items to get started."
            buttonText="Start Shopping"
            buttonLink="/"
          />
        </div>
      </div>
    );
  }

  /* Cart Items */

  return (
    <div className="cart-page">
      <header className="cart-header">
        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
        </button>

        <h2>My Cart</h2>
      </header>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}