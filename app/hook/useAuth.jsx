import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      jwt: null,

      // Función para establecer el usuario
      setAuth: (user, jwt) => set({ user, jwt }),

      // Función para cerrar sesión
      logout: () => set({ user: null, jwt: null }),
    }),
    {
      name: "auth-user",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
