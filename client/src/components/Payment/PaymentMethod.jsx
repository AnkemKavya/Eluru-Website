import React from "react";
import "./PaymentMethod.css";

import {
  HiOutlineCash,
  HiOutlineQrcode,
} from "react-icons/hi";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  upiPaid,
  setUpiPaid,
  total,
}) => {
  return (
    <>
      <div className="payment-card">

        <h3>Payment Method</h3>

        {/* Cash on Delivery */}

        <div
          className={`payment-option ${
            paymentMethod === "cod" ? "active" : ""
          }`}
          onClick={() => {
            setPaymentMethod("cod");
            setUpiPaid(false);
          }}
        >
          <div className="payment-left">

            <div className="payment-icon">
              <HiOutlineCash />
            </div>

            <div>
              <h4>Cash on Delivery</h4>
              <p>Pay in cash when your order arrives</p>
            </div>

          </div>

          <div
            className={`radio ${
              paymentMethod === "cod" ? "checked" : ""
            }`}
          />
        </div>

        {/* UPI */}

        <div
          className={`payment-option ${
            paymentMethod === "upi" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("upi")}
        >
          <div className="payment-left">

            <div className="payment-icon">
              <HiOutlineQrcode />
            </div>

            <div>
              <h4>Scan & Pay (UPI)</h4>
              <p>Instant payment via any UPI app</p>
            </div>

          </div>

          <div
            className={`radio ${
              paymentMethod === "upi" ? "checked" : ""
            }`}
          />
        </div>

      </div>

      {/* QR Section */}

      {paymentMethod === "upi" && (

        <div className="upi-card">

          <h2>Scan to Pay ₹{total}</h2>

          <p>Open any UPI app and scan the QR</p>

          <img
            src="C:/Users/Kavya/OneDrive/Pictures/Screenshots/Screenshot 2026-08-02 104744.png"
            alt="UPI QR"
            className="upi-qr"
          />

          <p className="upi-id-label">UPI ID</p>

          <h3 className="upi-id">
            healthyeluru@upi
          </h3>

          <label className="upi-checkbox">

            <input
              type="checkbox"
              checked={upiPaid}
              onChange={(e) =>
                setUpiPaid(e.target.checked)
              }
            />

            <span>I have completed the UPI payment</span>

          </label>

        </div>

      )}
    </>
  );
};

export default PaymentMethod;