"use client";
import { usePostRegister } from "@/app/_api/UseCreateAccount";
import Toast from "@/app/_components/Toast";
import useAuthStore from "@/app/hook/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser, loading, error } = usePostRegister();
  const { user, setAuth } = useAuthStore();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [colorToast, setColorToast] = useState("");
  const router = useRouter();

  const formDataValues = async (e) => {
    e.preventDefault();

    const res = await registerUser(username, email, password);

    if (res?.error) {
      setToastMessage(res?.error);
      setShowToast(true);
      setColorToast("error");
    } else {
      setAuth(res?.user, res?.jwt);
      setToastMessage("Registro existoso");
      setShowToast(true);
      setColorToast("success");

      router.push("/sign-in");
    }
  };

  // Si hay usuario iniciado, que no entre al register
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
            Create Account
          </h2>
        </div>
        <form onSubmit={formDataValues} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="example: crisfw05"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setUsername(e.target.value)}
            />

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
            {loading ? <span className="loader"></span> : "Registrar ahora"}
          </button>
        </form>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          color={colorToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default RegisterPage;
