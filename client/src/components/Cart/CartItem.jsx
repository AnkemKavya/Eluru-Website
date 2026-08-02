import React from "react";
import "./CartItem.css";
import QuantitySelector from "./QuantitySelector";

import { HiOutlineTrash } from "react-icons/hi";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  return (
    <div className="cart-item-card">

      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-details">

        <h3>{item.name}</h3>

        <p>{item.weight}</p>

        <h4>₹{item.price}</h4>

      </div>

      <div className="cart-item-actions">

        <button
          className="delete-btn"
          onClick={() => onDelete(item.id)}
        >
          <HiOutlineTrash />
        </button>

        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />

      </div>

    </div>
  );
};

export default CartItem;