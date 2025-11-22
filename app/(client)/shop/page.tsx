import Shop from "@/components/Shop";
import { getCategories } from "@/lib/categories";
import { getAllBrands } from "@/lib/brands";
import React, { Suspense } from "react";

const ShopPage = () => {
  const categories = getCategories();
  const brands = getAllBrands();
  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="flex min-h-[200px] items-center justify-center text-shop_dark_green">
            Loading shop…
          </div>
        }
      >
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;
