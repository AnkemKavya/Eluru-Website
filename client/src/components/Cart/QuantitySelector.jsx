import React from "react";
import "./QuantitySelector.css";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="quantity-selector">

      <button
        className="qty-btn"
        onClick={onDecrease}
      >
        <HiOutlineMinus />
      </button>

      <span className="qty-value">
        {quantity}
      </span>

      <button
        className="qty-btn"
        onClick={onIncrease}
      >
        <HiOutlinePlus />
      </button>

    </div>
  );
};

export default QuantitySelector;