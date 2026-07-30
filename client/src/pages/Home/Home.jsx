import React from "react";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import CategorySection from "../../components/CategorySection/CategorySection";
import ProductSection from "../../components/ProductSection/ProductSection";
import AppFooter from "../../components/AppFooter/AppFooter";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <HeroBanner />

      <CategorySection />

      <ProductSection />

      <AppFooter />
    </div>
  );
}

export default Home;