import Shop from "@/components/Shop";
import { getCategories } from "@/lib/categories";
import { getAllBrands } from "@/lib/brands";
import React from "react";

const ShopPage = () => {
  const categories = getCategories();
  const brands = getAllBrands();
  return (
    <div className="bg-white">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
