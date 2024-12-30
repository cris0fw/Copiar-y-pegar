import axios from "axios";
import { useState } from "react";

export const usePostRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerUser = async (username, email, password) => {
    setLoading(true);
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/local/register`;

      const res = await axios.post(url, {
        username,
        email,
        password,
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

  return { registerUser, loading, error };
};
