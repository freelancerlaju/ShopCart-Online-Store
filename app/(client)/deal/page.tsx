import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getDealProducts } from "@/lib/products";
import React from "react";
import NoProductAvailable from "@/components/NoProductAvailable";

const DealPage = () => {
  const products = getDealProducts();
  
  return (
    <div className="py-10 bg-shop_light_bg/30 min-h-screen">
      <Container>
        <div className="mb-8">
          <Title className="mb-2 text-3xl md:text-4xl font-bold text-darkColor">
            Hot Deals of the Week
          </Title>
          <p className="text-lightColor">
            Don&apos;t miss out on these amazing deals! Limited time offers on
            selected products.
          </p>
        </div>
        
        {products && products.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-lightColor">
                Showing <span className="font-semibold text-shop_dark_green">{products.length}</span> hot deal{products.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <NoProductAvailable />
        )}
      </Container>
    </div>
  );
};

export default DealPage;
