import axios from "axios";
import { useEffect, useState } from "react";

export const useProductsCategory = (categoryName) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filterProductCategory = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?populate=*&filters[category][categoryName][$in]=${categoryName}`;
      const res = await axios.get(url);

      setLoading(false);
      setResult(res.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    filterProductCategory();
  }, [categoryName]);

  return { result, loading, error };
};
