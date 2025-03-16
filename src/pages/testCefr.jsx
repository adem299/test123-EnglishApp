import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCefrLevel from "../services/cefr.service";

const TestCefrPage = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { cefrLevel, loading, error, predictCefrLevel } = useCefrLevel();

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAnalyze = async () => {
    await predictCefrLevel(text);
    console.log("API call triggered, waiting for cefrLevel");
    
  };

  useEffect(() => {
    if (cefrLevel) {
      console.log("CEFR Level updated:", cefrLevel);
      navigate("/result/cefr", { state: { cefrLevel } });
    }
  }, [cefrLevel, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Analyze CEFR Level</h2>
        <p className="text-gray-600 mb-6">
          Do you think this is a positive or negative development? Write at least 250 words.
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
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
        {cefrLevel && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <p>CEFR Level Prediction: {cefrLevel}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCefrPage;
