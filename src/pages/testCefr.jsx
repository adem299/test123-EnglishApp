import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/product.service";

const TestCefrPage = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAnalyze = () => {
    // alert("Text submitted for analysis: " + text);
    navigate("/result/cefr");
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
      // console.log(data);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {products.length > 0 && (
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {products[0].description}
          </h2>
        )}

        <p className="text-gray-600 mb-6">
          Do you think this is a positive or negative development? Write at
          least 250 words.
        </p>
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter text here..."
          value={text}
          onChange={handleTextChange}
          maxLength={1000}
        ></textarea>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-500 text-sm">{text.length}/1000</p>
          <div>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400"
              onClick={() => setText("")}
            >
              Clear
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleAnalyze}
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCefrPage;
