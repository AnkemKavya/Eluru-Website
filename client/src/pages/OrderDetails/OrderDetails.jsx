import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import OrderStatus from "../../components/OrderDetails/OrderStatus";
import DeliveryAddress from "../../components/OrderDetails/DeliveryAddress";
import PaymentInfo from "../../components/OrderDetails/PaymentInfo";
import OrderedItems from "../../components/OrderDetails/OrderedItems";

import "./OrderDetails.css";

export default function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // Order passed from Order Success or Orders page
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="order-details-page">
        <div className="order-not-found">
          <h2>Order not found</h2>

          <button onClick={() => navigate("/orders")}>
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">

      {/* Header */}

      <header className="order-details-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <HiOutlineArrowLeft />
        </button>

        <div>

          <h2>
            Order {order.orderId}
          </h2>

          <p>{order.date}</p>

        </div>

      </header>

      {/* Content */}

      <div className="order-details-content">

        <OrderStatus status={order.status} />

        <DeliveryAddress
          address={order.address}
        />

        <PaymentInfo
          paymentMethod={order.paymentMethod}
          total={order.total}
        />

        <OrderedItems
          items={order.items}
        />

      </div>

    </div>
  );
}