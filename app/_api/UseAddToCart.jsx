import axios from "axios";
import { useState } from "react";

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addToCart = async (data, jwt) => {
    setLoading(true);
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-carts`;

      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message;
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getUserCartAll = async (userId, jwt) => {
    setLoading(true);
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-carts?filters[userId][$eq]=${userId}&populate[products][populate]=images`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message;
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteProductCart = async (id, jwt) => {
    setLoading(true);
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-carts/${id}`;

      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return res.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message;
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, addToCart, getUserCartAll, deleteProductCart };
};
