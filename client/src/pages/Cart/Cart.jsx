import React, { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

import EmptyCard from "../../components/EmptyCard/EmptyCard";
import CartItem from "../../components/Cart/CartItem";
import BillSummary from "../../components/Cart/BillSummary";
import CheckoutBar from "../../components/Cart/CheckoutBar";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  /* Load Cart */

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

  /* ===========================
     Cart Functions
  ========================== */

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const onIncrease = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  const onDecrease = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      );

    updateCart(updatedCart);
  };

  const onDelete = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(updatedCart);
  };

  /* ===========================
     Bill Calculations
  ========================== */

  const itemTotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    itemTotal >= 499 ? 0 : 40;

  const handlingCharge = 10;

  const grandTotal =
    itemTotal + deliveryCharge;

  /* ===========================
     Empty Cart
  ========================== */

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

  /* ===========================
     Cart Page
  ========================== */

  return (
  <div className="cart-page">

    {/* Header */}
    <header className="cart-header">
      <button onClick={() => navigate(-1)}>
        <HiOutlineArrowLeft />
      </button>

      <div className="cart-header-text">
        <h2>My Cart</h2>
        <p>{cart.length} item{cart.length > 1 ? "s" : ""}</p>
      </div>
    </header>

    {/* Scrollable Content */}
    <div className="cart-content">

      {/* Cart Items */}
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Bill Details */}
      <div className="cart-bottom">
        <BillSummary
          itemTotal={itemTotal}
          deliveryCharge={deliveryCharge}
          grandTotal={grandTotal}
        />
      </div>

    </div>

    {/* Fixed Checkout Bar */}
    <CheckoutBar
      total={grandTotal}
      itemCount={cart.length}
      onCheckout={() => navigate("/checkout")}
    />

  </div>
);
}