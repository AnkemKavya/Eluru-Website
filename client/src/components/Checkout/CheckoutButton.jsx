import React from "react";
import "./CheckoutButton.css";

const CheckoutButton = ({
  text = "Continue",
  onClick,
  disabled = false,
}) => {
  return (
    <div className="checkout-button-container">

      <button
        className="checkout-button"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>

    </div>
  );
};

export default CheckoutButton;