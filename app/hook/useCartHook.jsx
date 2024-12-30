import { create } from "zustand";

const useCartStore = create((set) => ({
  cartCount: 0,
  loadingCart: false,
  setCartCount: (count) => set({ cartCount: count }),
  setLoadingCart: (loading) => set({ loadingCart: loading }),
}));

export default useCartStore;
