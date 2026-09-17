import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineCube,
  HiOutlineChevronRight,
} from "react-icons/hi";

import "./Orders.css";

export default function Orders() {
  const navigate = useNavigate();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="orders-page">

      {/* Header */}

      <header className="orders-header">

        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
        </button>

        <div className="header-text">
          <h2>My Orders</h2>
          <p>
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

      </header>

      {/* Orders */}

      <div className="orders-list">

        {orders.length === 0 ? (

          <div className="empty-orders">
            No Orders Yet
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="order-card"
              onClick={() =>
                navigate(`/track-order/${order.id}`)
              }
            >

              {/* Left */}

              <div className="order-left">

                <div className="order-icon">
                  <HiOutlineCube />
                </div>

                <div className="order-info">

                  <h3>{order.id}</h3>

                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                    ,{" "}
                    {new Date(order.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <span className="order-items">
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "item"
                      : "items"}
                  </span>

                </div>

              </div>

              {/* Right */}

              <div className="order-right">

                <span className="status">
                  {order.status || "Order Placed"}
                </span>

                <div className="price-row">

                  <h4 className="order-price">
                    ₹{order.total}
                  </h4>

                  <HiOutlineChevronRight className="arrow" />

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}