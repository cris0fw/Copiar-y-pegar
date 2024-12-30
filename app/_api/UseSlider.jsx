import axios from "axios";
import { useEffect, useState } from "react";

export const useGetSlider = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/sliders?populate=*`;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getSlider = async () => {
    try {
      const res = await axios.get(url);
      setLoading(false);

      const extratedImage = res?.data?.data.map(
        (image) => `${process.env.NEXT_PUBLIC_BASE_URL}${image?.image?.url}`
      );
      setResult(extratedImage);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlider();
  }, [url]);

  return { result, loading, error };
};
