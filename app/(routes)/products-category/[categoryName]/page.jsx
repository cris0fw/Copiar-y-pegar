"use client";
import { useProductsCategory } from "@/app/_api/UseProductCategory";
import Categories2 from "@/app/_components/Categories2";
import Product from "@/app/_components/Product";
import { useParams } from "next/navigation";

const CategoryProduct = () => {
  const { categoryName } = useParams();
  const { result, loading, error } = useProductsCategory(categoryName);

  return (
    <section>
      <div className="w-full p-6 bg-main_verde">
        <p className="text-2xl font-bold text-center text-white uppercase">
          {decodeURIComponent(categoryName)}
        </p>
      </div>
      <div className="container mx-auto">
        <Categories2 />

        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      </div>
    </section>
  );
};

export default CategoryProduct;
