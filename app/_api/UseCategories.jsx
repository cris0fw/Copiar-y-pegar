import { useEffect, useState } from "react";
import axios from "axios";

export const getCategory = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?populate=*`;
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCategoriesProduct = async () => {
    try {
      const res = await axios.get(url);
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesProduct();
  }, [url]);

  return { result, error, loading };
};
