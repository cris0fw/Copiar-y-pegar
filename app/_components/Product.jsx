"use client";
import Image from "next/image";
import React, { useState } from "react";
import Dialog from "./Dialog";

const Product = ({ products }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="flex flex-col justify-between p-4 transition-shadow duration-300 bg-white border rounded-lg shadow-md hover:shadow-lg">
      <div>
        <div className="relative object-contain w-[100%] h-48">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${products?.images?.url}`}
            alt={products?.name}
            className="rounded-t-lg"
            fill
            sizes="48"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {products?.name}
          </h2>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-green-600">
              ${products?.mrp}
            </span>
            {products?.sellingPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${products?.sellingPrice}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={toggleDialog}
        className="w-full px-4 py-2 mt-4 font-bold text-white transition-colors duration-300 rounded-lg bg-main_verde hover:bg-main_verde/90"
      >
        Añadir al carrito
      </button>

      {isDialogOpen && <Dialog product={products} onClose={toggleDialog} />}
    </div>
  );
};

export default Product;
