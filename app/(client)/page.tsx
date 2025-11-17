import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/lib/categories";
import React from "react";

const Home = () => {
  const categories = getCategories(6);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrands />
      <LatestBlog />
    </Container>
  );
};

export default Home;
