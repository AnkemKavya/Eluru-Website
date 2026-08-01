import React, { useState, useRef, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../services/productService";

import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setFilteredProducts([]);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    onSearch?.(value);

    if (!value.trim()) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(value.toLowerCase())
    );

    setFilteredProducts(results.slice(0, 8));
  };

  return (
    <div className="search-wrapper" ref={searchRef}>
      <div className="search-box">
        <HiOutlineSearch className="search-icon" />

        <input
          value={search}
          placeholder="Search vegetables, fruits, food, medicines..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {filteredProducts.length > 0 && (
        <div className="search-dropdown">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="search-item"
              onClick={() => {
                navigate(`/product/${product.id}`);
                setSearch("");
                setFilteredProducts([]);
              }}
            >
              <img src={product.image} alt={product.name} />

              <div className="search-info">
                <h4>{product.name}</h4>
                <p>{product.category}</p>
              </div>

              <span>₹{product.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;