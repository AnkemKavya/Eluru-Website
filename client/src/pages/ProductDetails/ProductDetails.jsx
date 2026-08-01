import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaPlus,
  FaMinus,
  FaTruck,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/productService";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const products = getProducts();

    const selectedProduct = products.find(
      (item) => item.id === Number(id)
    );

    setProduct(selectedProduct);

    if (selectedProduct) {
      const related = products
        .filter(
          (item) =>
            item.category === selectedProduct.category &&
            item.id !== selectedProduct.id
        )
        .slice(0, 4);

      setRelatedProducts(related);

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(
        (item) => item.id === selectedProduct.id
      );

      if (existing) {
        setQuantity(existing.quantity);
      }
    }
  }, [id]);

  const addToCart = () => {
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(
      (item) => item.id === product.id
    );

    if (index !== -1) {
      cart[index].quantity = quantity;
    } else {
      cart.push({
        ...product,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart");
  };

  if (!product) {
    return (
      <div className="product-details">
        <h2>Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="product-details">

      {/* Image */}

      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Details */}

      <div className="product-info-section">

        <span className="category-tag">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <div className="rating-row">
          <FaStar />

          <span>{product.rating}</span>

          <span className="weight">
            • {product.weight}
          </span>
        </div>

        <div className="price-row">
          <h2>₹{product.price}</h2>

          {product.oldPrice && (
            <span className="old-price">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <p className="description">
          {product.description ||
            "Fresh, premium quality product delivered directly to your doorstep. Carefully selected to ensure freshness and taste."}
        </p>

        {/* Quantity */}

        <div className="quantity-container">

          <h3>Quantity</h3>

          <div className="quantity-box">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
            >
              <FaMinus />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              <FaPlus />
            </button>

          </div>

        </div>

        {/* Add Button */}

        <button
          className="add-cart-btn"
          onClick={addToCart}
        >
          Add {quantity} to Cart • ₹
          {product.price * quantity}
        </button>

        {/* Delivery */}

        <div className="delivery-card">

          <div className="delivery-item">
            <FaTruck />

            <div>
              <h4>Free Delivery</h4>

              <p>Orders above ₹299</p>
            </div>
          </div>

          <div className="delivery-item">
            <FaClock />

            <div>
              <h4>Delivery Time</h4>

              <p>10-20 Minutes</p>
            </div>
          </div>

          <div className="delivery-item">
            <FaShieldAlt />

            <div>
              <h4>Quality Assured</h4>

              <p>100% Fresh Products</p>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}

      {relatedProducts.length > 0 && (
        <div className="related-section">

          <h2>You may also like</h2>

          <div className="related-grid">

            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default ProductDetails;