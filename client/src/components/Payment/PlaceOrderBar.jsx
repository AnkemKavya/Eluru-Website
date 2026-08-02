import React from "react";
import "./PlaceOrderBar.css";

const PlaceOrderBar = ({
  total,
  onBack,
  onPlaceOrder,
  disabled,
}) => {
  return (
    <div className="place-order-bar">

      <button
        className="back-btn"
        onClick={onBack}
      >
        Back
      </button>

      <button
        className="place-order-btn"
        disabled={disabled}
        onClick={onPlaceOrder}
      >
        Place Order • ₹{total}
      </button>

    </div>
  );
};

export default PlaceOrderBar;