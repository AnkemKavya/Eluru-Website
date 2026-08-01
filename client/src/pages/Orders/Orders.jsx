import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import EmptyCard from "../../components/EmptyCard/EmptyCard";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">

      {/* Header */}

      <header className="orders-header">

        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
        </button>

        <h2>My Orders</h2>

      </header>

      {/* Empty Orders */}

      {orders.length === 0 ? (
        <div className="empty-orders">
          <EmptyCard
            type="orders"
            title="No Orders Yet"
            subtitle="Place your first order and it will appear here."
            buttonText="Start Shopping"
            buttonLink="/"
          />
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order, index) => (
            <div className="order-card" key={index}>

              <h3>Order #{index + 1}</h3>

              <p>Total : ₹{order.total}</p>

              <p>Items : {order.items.length}</p>

              <p>Status : Confirmed</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Orders;