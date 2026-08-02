import React from "react";
import "./CheckoutBar.css";

const CheckoutBar = ({
  total,
  itemCount,
  onCheckout,
}) => {
  return (
    <div className="checkout-bar">

      <div className="checkout-info">

        <span className="checkout-label">
          To Pay
        </span>

        <h2>₹{total}</h2>

        <small>{itemCount} item(s)</small>

      </div>

      <button
        className="checkout-btn"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>

    </div>
  );
};

export default CheckoutBar;