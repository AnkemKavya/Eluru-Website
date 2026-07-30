import React from "react";
import "./SearchBar.css";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = () => {
  return (
    <div className="search-container">
      <HiOutlineSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search vegetables, fruits, food, medicine..."
      />
    </div>
  );
};

export default SearchBar;