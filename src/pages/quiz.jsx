import React, { useState } from "react";

// Component for Individual Question
const Question = ({ questionData, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Question */}
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        {questionNumber}. {questionData.question}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {questionData.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`border rounded-lg p-3 cursor-pointer ${
              selectedOption === option
                ? option === questionData.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "hover:bg-gray-100"
            }`}
          >
            <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>{" "}
            <span>{option}</span>
          </div>
        ))}
      </div>

      {/* Explanation */}
      {/* {selectedOption && (
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Penjelasan :</h3>
          <p className="text-gray-700 mb-2">{questionData.explanation}</p>
          <h4 className="font-semibold text-gray-800 mb-2">Tips :</h4>
          <ul className="list-disc pl-5 text-gray-700">
            {questionData.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

// Main Quiz Page
const QuizPage = () => {
  const [score, setScore] = useState(210);

  // Sample Data for Questions
  const questions = [
    {
      question:
        "Even though the team members worked diligently to complete the project, they _______ enough time to finalize all the details.",
      options: [
        "Lorem ipsum odor amet.",
        "Lorem ipsum odor amet, consectetuer adipiscing.",
        "Lorem ipsum odor amet, consectetuer adipiscing elit.",
        "Lorem ipsum odor.",
      ],
      correctAnswer: "Lorem ipsum odor amet.",
      explanation:
        "Kalimat ini membicarakan kejadian di masa lalu (worked diligently), jadi kita harus menggunakan bentuk lampau (past tense), yaitu did not have. Pilihan lainnya salah karena menggunakan bentuk sekarang atau bentuk waktu yang tidak sesuai.",
      tips: [
        "Perhatikan kata keterangan waktu atau petunjuk dalam kalimat, seperti worked (lampau), yang menunjukkan bahwa jawabannya harus dalam bentuk past tense.",
        "Jangan terpaku dengan kata kerja yang terlihat tepat tapi tidak sesuai waktu yang dibutuhkan dalam kalimat.",
      ],
    },
    {
      question:
        "The cultural artifacts discovered by archaeologists in the region _______ important information about the trade routes of ancient civilizations.",
      options: [
        "provide",
        "provides",
        "provided",
        "is providing",
      ],
      correctAnswer: "provide",
      explanation:
        "Kalimat ini menggunakan present tense karena berbicara tentang fakta yang masih berlaku hingga saat ini.",
      tips: [
        "Perhatikan bentuk kata kerja yang sesuai dengan subjek jamak (artifacts).",
        "Fakta umum biasanya menggunakan present tense.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-blue-600 font-semibold">Back</button>
        <div className="text-orange-500 font-bold text-lg">Score : {score}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: "100%" }}></div>
      </div>

      {/* Render Questions */}
      {questions.map((question, index) => (
        <Question
          key={index}
          questionData={question}
          questionNumber={index + 1}
        />
      ))}

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
