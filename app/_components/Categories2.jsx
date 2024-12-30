import React from "react";
import { getCategory } from "../_api/UseCategories";
import Image from "next/image";
import Link from "next/link";

const Categories2 = () => {
  const {
    result: categoryResult,
    loading: categoryLoading,
    error: categoryError,
  } = getCategory();

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-5">
      {categoryResult?.data && categoryResult?.data?.length ? (
        categoryResult?.data?.map((category) => {
          return (
            <Link
              href={`/products-category/${category?.categoryName}`}
              key={category?.id}
            >
              <div className="bg-[#C5DAA7] transition-colors duration-300 hover:bg-[#7FAD39] cursor-pointer py-4 px-5 rounded-lg flex flex-col items-center justify-center shadow-md">
                <div className="relative object-contain w-[50px] h-[50px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${category?.categoryImage[0]?.url}`}
                    fill
                    alt={category?.categoryName}
                    className="mb-2"
                    sizes={50}
                  />
                </div>
                <p className="w-full text-sm font-medium text-center text-gray-800">
                  {category?.categoryName}
                </p>
              </div>
            </Link>
          );
        })
      ) : categoryLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{categoryError || "No se encuentran las categorias"}</p>
      )}
    </div>
  );
};

export default Categories2;
