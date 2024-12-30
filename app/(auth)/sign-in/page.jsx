"use client";
import { useSignUser } from "@/app/_api/UseSignIn";
import Toast from "@/app/_components/Toast";
import useAuthStore from "@/app/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading, error } = useSignUser();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [colorToast, setColorToast] = useState("");

  const router = useRouter();
  const { setAuth, user } = useAuthStore();

  const onSignIn = async (e) => {
    e.preventDefault();

    const res = await loginUser(email, password);

    if (res?.error) {
      setToastMessage(res?.error);
      setShowToast(true);
      setColorToast("error");
    } else {
      setAuth(res?.user, res?.jwt);
      setToastMessage("Redireccionando user");
      setShowToast(true);
      setColorToast("success");
      router.push("/");
    }
  };

  //   Si hay usuario iniciado, que no entre a login
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <Image src="/logo.png" width={100} height={100} alt="logo" />
          <h2 className="mb-6 text-2xl font-bold text-center text-primary">
            Login
          </h2>
        </div>
        <form onSubmit={onSignIn} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="example: crisludue5@gmail.com"
              required
              className="w-full px-4 py-2 mt-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              placeholder="example: hkjdsfHFDDDD73"
              required
              className="w-full px-4 py-2 mt-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition duration-200 bg-green-600 rounded hover:bg-green-600/50"
          >
            {loading ? <span className="loader"></span> : "Login"}
          </button>

          <Link href="/create-account" className="block mt-4 text-black">
            ¿No tenes cuenta?
            <span className="font-semibold text-blue-600 hover:underline">
              {" "}
              Registrate aqui
            </span>
          </Link>
        </form>
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

export default LoginUser;
