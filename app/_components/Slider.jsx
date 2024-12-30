"use client";
import React, { useState } from "react";
import Image from "next/image";
import { sliderImages } from "../_utils/images";
import { useGetSlider } from "../_api/UseSlider";

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { result, error, loading } = useGetSlider();

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative mt-5 sm:h-[500px] md:h-[600px] lg:h-[400px] w-full h-[300px] overflow-hidden">
      {result && result.length > 0 ? (
        <>
          <img
            src={result[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="object-cover w-full h-full transition-transform transform"
          />

          <button
            className="absolute left-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full cursor-pointer top-1/2 bg-opacity-30"
            onClick={prevImage}
          >
            <div className="relative object-contain w-[30px] h-[30px]">
              <Image sizes="30" fill alt="flecha izquierda" src={"/left.svg"} />
            </div>
          </button>
          <button
            className="absolute right-0 p-2 text-white transform -translate-y-1/2 bg-black rounded-full cursor-pointer top-1/2 bg-opacity-30"
            onClick={nextImage}
          >
            <div className="relative object-contain w-[30px] h-[30px]">
              <Image fill alt="flecha derecha" src={"/right.svg"} />
            </div>
          </button>
        </>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>{error || "No se encontraron las imagenes del slider"}</p>
      )}
    </div>
  );
};

export default Slider;
