import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProducts = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProduct = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?populate=*`;
      const res = await axios.get(url);

      setLoading(false);
      setResult(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return { result, loading, error };
};
