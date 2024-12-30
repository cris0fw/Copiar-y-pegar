"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import useAuthStore from "../hook/useAuth";
import { useAddToCart } from "../_api/UseAddToCart";
import useCartStore from "../hook/useCartHook";
import CartModal from "./CartModal";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  //El drawer del carrito
  const [isCartModal, setIsCartModal] = useState(false);
  // Menu dropDownMenu
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const { user, jwt } = useAuthStore();
  const { getUserCartAll } = useAddToCart();
  const { cartCount, setCartCount, setLoadingCart, loadingCart } =
    useCartStore();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Abriendo y cerrando el dropDownMenu
  const onDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

  // Validamos si existe el usuario y el jwt para la sesión
  useEffect(() => {
    if (user && jwt) {
      getCartUser();
    }
  }, [user, jwt]);

  const getCartUser = async () => {
    setLoadingCart(true);
    try {
      const res = await getUserCartAll(user?.id, jwt);
      setCartCount(res.data?.length || 0);
    } catch (error) {
      console.log("Error cargando el carrito", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const toggleCartModal = () => {
    setIsCartModal((prev) => !prev);
  };

  return (
    <header id="navbar" className="fixed top-0 left-0 z-50 w-full">
      <nav className="container flex items-center justify-between h-16 sm:h-20">
        <div className="relative w-[90px] h-[50px] object-contain">
          <Image sizes="90" src="/logo.png" fill alt="logo menu" />
        </div>

        <div
          id="nav-menu"
          className={`absolute top-0 overflow-hidden ${
            menuOpen ? "left-0" : "left-[-100%]"
          } min-h-[100vh] w-full bg-black/80 backdrop-blur-sm flex items-center justify-center duration-300 lg:static lg:min-h-fit lg:bg-transparent lg:w-auto`}
        >
          <ul className="flex flex-col items-center gap-5 lg:flex-row">
            <li>
              <a href="#home" className="no-underline nav-link active">
                Home
              </a>
            </li>
            <li>
              <a className="no-underline nav-link">Proyectos</a>
            </li>
            <li>
              <a href="#habilidades" className="no-underline nav-link">
                Habilidades
              </a>
            </li>
            <li>
              <a href="#contacto" className="no-underline nav-link">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-5">
          <div className="flex gap-1">
            {/* Botón del carrito */}
            <div
              onClick={toggleCartModal}
              className="relative object-contain w-[30px] h-[30px] cursor-pointer"
            >
              <Image src="/cart.svg" fill alt="carrito" sizes="30" />
              <p className="absolute top-[-5px] right-[-5px] h-6 w-6 flex items-center justify-center text-xs font-bold text-white rounded-full bg-main_verde">
                {loadingCart ? "..." : cartCount}
              </p>
            </div>
            {/* Modal del carrito */}
            <CartModal
              isCartModal={isCartModal}
              setIsCartModal={setIsCartModal}
            />
          </div>

          {/* Usuario o login */}
          {user ? (
            <div className="relative">
              <div className="relative object-contain w-[35px] h-[35px]">
                <Image
                  onClick={onDropDownMenu}
                  src="/profile.svg"
                  fill
                  alt="profile user"
                  className="cursor-pointer"
                  sizes="35"
                />
              </div>
              {dropDownMenu && <DropDownMenu />}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="px-2 py-1 text-lg text-white rounded-md bg-main_verde"
            >
              Login
            </Link>
          )}
        </div>

        {/* Botón menú hamburguesa */}
        <div id="hamburguer" className="z-50 cursor-pointer lg:hidden">
          <div className="relative object-cover w-[30px] h-[30px]">
            <Image
              onClick={toggleMenu}
              src="/menu.svg"
              fill
              alt="menu hamburguesa"
              sizes="30"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
