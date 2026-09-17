import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import OrderStatus from "../../components/OrderDetails/OrderStatus";
import DeliveryAddress from "../../components/OrderDetails/DeliveryAddress";
import PaymentInfo from "../../components/OrderDetails/PaymentInfo";
import OrderedItems from "../../components/OrderDetails/OrderedItems";

import "./OrderDetails.css";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find(
    (o) => String(o.id) === id
  );

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
          <h2>Order {order.id}</h2>

          <p>
            {new Date(order.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
            ,{" "}
            {new Date(order.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
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