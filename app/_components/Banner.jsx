import React from "react";

const Banner = ({ title, description, image, bannerStyles }) => {
  return (
    <div className={bannerStyles}>
      <div className="w-40 lg:w-52">
        <img src={image} alt="Summer Fruit" className="rounded-lg" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <button className="px-6 py-2 mt-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600">
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Banner;
