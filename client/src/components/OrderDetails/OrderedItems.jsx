import React from "react";
import "./OrderedItems.css";

export default function OrderedItems({ items }) {
  return (
    <div className="order-card">

      <h3>Ordered Items</h3>

      <div className="ordered-items">

        {items.map((item) => (

          <div
            className="ordered-item"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="ordered-item-details">

              <h4>{item.name}</h4>

              {item.weight && (
                <p>{item.weight}</p>
              )}

              <span>
                Qty : {item.quantity}
              </span>

            </div>

            <div className="ordered-item-price">

              ₹{item.price * item.quantity}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}