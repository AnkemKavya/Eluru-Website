import React from "react";
import "./BillSummary.css";

const BillSummary = ({
  itemTotal,
  deliveryCharge,
  handlingCharge,
  grandTotal,
}) => {

  const freeDelivery = itemTotal >= 499;

  return (
    <div className="bill-summary">

      <h2>Bill Details</h2>

      <div className="bill-row">
        <span>Item Total</span>
        <span>₹{itemTotal}</span>
      </div>

      <div className="bill-row">
        <span>Delivery Charge</span>

        {freeDelivery ? (
          <span className="free-delivery">
            FREE
          </span>
        ) : (
          <span>₹{deliveryCharge}</span>
        )}
      </div>

      <div className="bill-row">
        <span>Handling Charge</span>
        <span>₹{handlingCharge}</span>
      </div>

      <hr />

      <div className="bill-total">
        <span>To Pay</span>
        <span>₹{grandTotal}</span>
      </div>

    </div>
  );
};

export default BillSummary;