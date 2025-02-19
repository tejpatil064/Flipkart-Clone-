import React from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import { Hero } from "../../components/Hero/index.jsx";
import ProductCategory from "../../pages/ProductCategory.js";
// import ProductSuggestions from '../components/ProductSuggestions

export const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      {/* <ProductSuggestions/> */}
      <ProductCategory/>
      <Footer />
    </div>
  );
};
