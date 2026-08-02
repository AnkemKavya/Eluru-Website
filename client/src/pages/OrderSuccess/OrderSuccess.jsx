import React from "react";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineCheck,
  HiOutlineHome,
  HiOutlineCube,
} from "react-icons/hi";

import "./OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const latestOrder =
    JSON.parse(localStorage.getItem("orders"))?.[0];

  if (!latestOrder) {
    navigate("/orders");
    return null;
  }

  return (
    <div className="order-success-page">

      <div className="success-content">

        <div className="success-icon">
          <HiOutlineCheck />
        </div>

        <h1>Order Placed!</h1>

        <p>
          Thank you for shopping with Healthy Eluru.
          <br />
          Your order will be delivered shortly.
        </p>

        <div className="success-card">

          <div className="success-row">

            <div>
              <span>Order ID</span>

              <h3>{latestOrder.id}</h3>
            </div>

            <div className="amount">

              <span>Amount</span>

              <h3>₹{latestOrder.total}</h3>

            </div>

          </div>

          <hr />

          <p>
            {latestOrder.paymentMethod === "upi"
              ? "UPI (Paid)"
              : "Cash on Delivery"}
            {" • "}
            {latestOrder.items.length} item(s)
          </p>

        </div>

        <div className="success-buttons">

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            <HiOutlineHome />
            Home
          </button>

          <button
            className="track-btn"
            onClick={() =>
                navigate("/order-details", {
                state: {
                    order: latestOrder,
                },
            })
        }
>
  <HiOutlineCube />
  Track Order
</button>

        </div>

      </div>

    </div>
  );
}