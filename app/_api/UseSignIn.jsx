import axios from "axios";
import { useState } from "react";

export const useSignUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local`;

      const res = await axios.post(url, {
        identifier: email,
        password: password,
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

  return { loginUser, loading, error };
};
