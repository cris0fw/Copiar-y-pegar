"use client";
import { useGetProducts } from "@/app/_api/UseProducts";
import React from "react";
import Product from "../Product";

const Products = () => {
  const { result, loading, error } = useGetProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {result?.data && result?.data?.length ? (
        result?.data.map((product) => {
          return <Product key={product?.id} products={product} />;
        })
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <p>{error || "Error no se encuentran los productos"}</p>
      )}
    </div>
  );
};

export default Products;
