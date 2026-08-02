import React from "react";
import "./PaymentInfo.css";

import {
  HiOutlineCash,
  HiOutlineQrcode,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export default function PaymentInfo({
  paymentMethod,
  total,
}) {
  const isUPI =
    paymentMethod?.toLowerCase().includes("upi");

  return (
    <div className="order-card">

      <h3>Payment Details</h3>

      <div className="payment-info">

        {/* Payment Method */}

        <div className="payment-row">

          <div className="payment-left">

            <div className="payment-method-icon">

              {isUPI ? (
                <HiOutlineQrcode />
              ) : (
                <HiOutlineCash />
              )}

            </div>

            <div>

              <h4>
                {isUPI
                  ? "Scan & Pay (UPI)"
                  : "Cash on Delivery"}
              </h4>

              <p>
                {isUPI
                  ? "Paid Successfully"
                  : "Pay on Delivery"}
              </p>

            </div>

          </div>

          <div className="payment-status">

            <HiOutlineCheckCircle />

            <span>
              {isUPI ? "Paid" : "Pending"}
            </span>

          </div>

        </div>

        <hr />

        {/* Amount */}

        <div className="payment-total">

          <span>Total Amount</span>

          <h2>₹{total}</h2>

        </div>

      </div>

    </div>
  );
}