import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({
  itemCount,
  itemTotal,
  deliveryCharge,
  grandTotal,
}) => {
  return (
    <div className="payment-card">

      <h3>Order Summary</h3>

      <div className="summary-row">

        <span>Items ({itemCount})</span>

        <span>₹{itemTotal}</span>

      </div>

      <div className="summary-row">

        <span>Delivery Charge</span>

        <span>
          {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
        </span>

      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total">

        <span>Total</span>

        <span>₹{grandTotal}</span>

      </div>

    </div>
  );
};

export default OrderSummary;