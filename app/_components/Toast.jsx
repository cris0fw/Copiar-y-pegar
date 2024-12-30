"use client";
import React, { useEffect } from "react";

const Toast = ({ message, onClose, color }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed z-50 top-5 right-5">
      <div
        className={`flex items-center justify-between w-full max-w-xs p-4 text-white ${
          color === "success" ? "bg-green-500" : "bg-red-500"
        } rounded shadow-lg`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
