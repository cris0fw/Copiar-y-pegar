"use client";
import Image from "next/image";
import React, { useState } from "react";
import { getCategory } from "../_api/UseCategories";
import Link from "next/link";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { result, error, loading } = getCategory();

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[30%] shadow-sm ">
      <div>
        <div
          onClick={toggleDropDown}
          className="flex items-center justify-between px-4 py-2 text-lg font-bold text-white shadow-md cursor-pointer bg-main_verde"
        >
          <div className="relative object-contain w-[30px] h-[30px]">
            <Image src="menu-blanco.svg" sizes={30} fill alt="categorias" />
          </div>
          <p>Categorias</p>
          <div className="relative object-contain w-[20px] h-[20px]">
            <Image src="/bottom.svg" sizes={20} fill alt="flecha abajo" />
          </div>
        </div>
        <div
          className={`flex flex-col gap-3 px-4  mt-2 transition-all duration-700 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden"
          }`}
        >
          {!loading &&
            result?.data !== undefined &&
            result?.data.map((category) => {
              return (
                <Link
                  key={category?.id}
                  href={`/products-category/${category?.categoryName}`}
                >
                  <div className="flex gap-2">
                    <div className="relative object-contain w-[23px] h-[23px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${category?.categoryImage[0]?.url}`}
                        fill
                        sizes={23}
                        alt="Iconos"
                      />
                    </div>
                    <p>{category?.categoryName}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
