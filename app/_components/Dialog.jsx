import Image from "next/image";
import React, { useState } from "react";
import useAuthStore from "../hook/useAuth";
import { useRouter } from "next/navigation";
import { useAddToCart } from "../_api/UseAddToCart";
import Toast from "./Toast";
import useCartStore from "../hook/useCartHook";

const Dialog = ({ product, onClose }) => {
  const [productTotalPrice, setProductTotalPrice] = useState(
    product?.sellingPrice ? product?.sellingPrice : product?.mrp
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [colorToast, setColorToast] = useState("");

  const { addToCart, loading, error, getUserCartAll } = useAddToCart();
  const { setCartCount } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const { user, jwt } = useAuthStore();
  const router = useRouter();

  const addToCartFunction = async () => {
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: [product.id],
        users_permissions_users: user?.id,
        userId: user?.id,
      },
    };

    if (user) {
      const res = await addToCart(data, jwt);

      if (res?.error) {
        setToastMessage(res?.error);
        setShowToast(true);
        setColorToast("error");
      } else {
        setToastMessage("Añadido al carrito!");
        setShowToast(true);
        setColorToast("success");
        const newCartCount =
          (await getUserCartAll(user?.id, jwt)).data?.length || 0;
        setCartCount(newCartCount);
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white grid grid-cols-1 md:grid-cols-2 p-7 rounded-lg shadow-lg w-[90%] max-w-2xl gap-5">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Imagen del producto */}
        <div className="flex items-center justify-center">
          <div className="relative object-contain w-[300px] h-[300px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${product?.images?.url}`}
              fill
              className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
              alt={product?.name}
              sizes={320}
            />
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{product?.name}</h2>
          <p className="text-sm text-gray-500">{product?.description}</p>

          <div className="flex gap-3">
            {product?.sellingPrice && (
              <h2 className="text-lg font-bold text-green-600">
                ${product?.sellingPrice}
              </h2>
            )}
            <h2
              className={`font-bold text-lg ${
                product?.sellingPrice && "line-through text-gray-400"
              }`}
            >
              ${product?.mrp}
            </h2>
          </div>

          <h2 className="text-lg font-medium">
            Quantity ({product?.itemQuantityType})
          </h2>

          <div className="flex flex-col items-baseline gap-3">
            <div className="flex gap-3">
              <div className="flex items-center gap-10 p-2 px-5 border">
                <button
                  disabled={quantity == 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="text-lg font-bold text-gray-600 hover:text-gray-800"
                >
                  -
                </button>
                <h2 className="text-lg font-medium">{quantity}</h2>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg font-bold text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>

              <h2 className="text-2xl font-bold">
                = {quantity * productTotalPrice}{" "}
              </h2>
            </div>

            {/* Botón de añadir al carrito */}
            <button
              onClick={addToCartFunction}
              className="flex items-center w-full gap-3 px-4 py-2 mt-4 font-bold text-white transition-colors duration-300 rounded-lg bg-main_verde hover:bg-main_verde/90"
            >
              <div className="relative object-contain w-[30px] h-[30px]">
                <Image sizes={30} src="/cart.svg" fill alt="cart" />
              </div>
              {loading ? <span className="loader"></span> : "Añadir al carrito"}
            </button>
          </div>

          <p className="text-sm text-gray-700">
            <span className="font-medium">Category:</span>{" "}
            {product?.category?.categoryName}
          </p>
        </div>
      </div>

      {showToast && (
        <Toast
          color={colorToast}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Dialog;
