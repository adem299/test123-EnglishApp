import { useState } from "react";
import axios from "axios";

const useCefrLevel = () => {
  const [cefrLevel, setCefrLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictCefrLevel = async (text) => {
    setLoading(true);
    try {
      const payload = [text]; // Bungkus input text dalam array
      console.log("Payload being sent:", payload);
      const res = await axios.post(
        "https://toeflify-service-473598678247.asia-southeast2.run.app/predict/cefr-level",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCefrLevel(res.data.predictions[0]);
      console.log("CEFR Level:", res.data.predictions[0]);
    } catch (err) {
      console.error("Error response:", err.response);
      setError(err.response?.data?.detail?.[0]?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { cefrLevel, loading, error, predictCefrLevel };
};



export default useCefrLevel;
