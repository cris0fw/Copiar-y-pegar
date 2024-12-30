"use client";
import React, { useEffect, useState } from "react";
import { useAddToCart } from "../_api/UseAddToCart";
import useAuthStore from "../hook/useAuth";
import useCartStore from "../hook/useCartHook";
import Toast from "./Toast";

const CartModal = ({ setIsCartModal, isCartModal }) => {
  const { getUserCartAll, deleteProductCart } = useAddToCart();
  const { user, jwt } = useAuthStore();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { cartCount } = useCartStore();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [colorToast, setColorToast] = useState("");

  const handleClickInside = (event) => {
    event.stopPropagation(); // Evita que el clic dentro del Drawer cierre el modal
  };

  const closeModal = () => {
    setIsCartModal(false);
  };

  const getCartUser = async () => {
    try {
      const res = await getUserCartAll(user?.id, jwt);
      const cartData = res.data;

      let total = 0;

      cartData.forEach((element) => {
        total = total + element?.amount;
      });
      setSubtotal(total);
      setCartItems(cartData);
    } catch (error) {
      console.log("Error cargando el carrito", error);
    }
  };

  const deleteCart = async (id) => {
    await deleteProductCart(id, jwt);
    console.log(id);

    console.log(cartItems);
  };

  useEffect(() => {
    if (user && jwt) {
      getCartUser();
    }
  }, [user, jwt]);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full z-50 bg-black/50 flex items-center justify-end transition-opacity duration-300 ${
        isCartModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={closeModal} // Cierra el modal al hacer clic fuera
    >
      <div
        className={`bg-white h-full w-full sm:w-[450px] p-4 shadow-lg transition-transform transform ${
          isCartModal ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={handleClickInside} // Evita el cierre al hacer clic dentro del modal
      >
        <button onClick={closeModal}> ✖</button>

        <h1 className="mt-5 mb-3 text-3xl font-semibold text-azul_oscuro">
          Carrito
        </h1>

        <div className="overflow-y-auto max-h-[350px] bg-gris_claro p-2">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-white rounded shadow-sm"
              >
                <p>{item.id}</p>
                {/* PRODUCTO E IMAGEN */}
                <div className="flex items-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item?.products[0]?.images?.url}`}
                    alt={item?.products[0]?.name}
                    className="object-cover w-12 h-12 mr-2"
                  />
                  <div>
                    <p className="font-semibold">{item?.products[0]?.name}</p>
                    <p className="text-gray-500">${item?.amount}</p>
                  </div>
                </div>
                <p className="text-gray-700">{item?.quantity}</p>
                <button
                  onClick={() => deleteCart(item?.id)}
                  className="ml-2 text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tu carrito está vacío.</p>
          )}
        </div>

        <section className="p-2 mt-20 bg-azul_oscuro">
          <article className="flex justify-between">
            <p className="text-amarillo_claro">SubTotal</p>
            <p className="text-amarillo_claro">${subtotal}</p>
          </article>
        </section>

        <div className="flex justify-center w-full mx-auto">
          <button className="mt-10 w-full sm:w-[180px] bg-[#7FAD39] text-white p-2 rounded">
            Ver carrito
          </button>
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

export default CartModal;
