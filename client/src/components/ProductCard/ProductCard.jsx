import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import { FaStar, FaPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((p) => p.id === product.id);

    if (item) setQuantity(item.quantity);
  }, [product.id]);

  const updateCart = (qty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex((p) => p.id === product.id);

    if (qty === 0) {
      cart = cart.filter((p) => p.id !== product.id);
    } else {
      if (index !== -1) {
        cart[index].quantity = qty;
      } else {
        cart.push({
          ...product,
          quantity: qty,
        });
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(qty);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">

        <div className="rating-row">
          <div className="rating">
            <FaStar />
            <span>{product.rating}</span>
            <small>• {product.weight}</small>
          </div>
        </div>

        <h3>{product.name}</h3>

        <div className="bottom">

          <h2>₹{product.price}</h2>

          {quantity === 0 ? (
            <button
              className="circle-btn"
              onClick={() => updateCart(1)}
            >
              <FaPlus />
            </button>
          ) : (
            <div className="quantity-box">
              <button onClick={() => updateCart(quantity - 1)}>
                -
              </button>

              <span>{quantity}</span>

              <button onClick={() => updateCart(quantity + 1)}>
                +
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductCard;