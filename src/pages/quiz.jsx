import React, { useState } from "react";

// Component for Individual Question
const Question = ({ questionData, questionNumber, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onAnswerChange(questionNumber - 1, option); // Update the selected answer for this question
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
                ? "bg-blue-100 border-blue-200"
                : "hover:bg-gray-100"
            }`}
          >
            <span className="font-semibold">
              {String.fromCharCode(65 + index)}.
            </span>{" "}
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Quiz Page
const QuizPage = () => {
  const [score, setScore] = useState(210);
  const [answers, setAnswers] = useState([]); // Array to store user answers

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
    },
    {
      question:
        "The cultural artifacts discovered by archaeologists in the region _______ important information about the trade routes of ancient civilizations.",
      options: ["provide", "provides", "provided", "is providing"],
      correctAnswer: "provide",
    },
  ];

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer; // Update the answer for the specific question
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Check answers and calculate score
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore += 10; // Example: 10 points for each correct answer
      }
    });
    setScore(newScore);

    // Display results
    console.log("User Answers:", answers);
    console.log("Final Score:", newScore);
    alert(`Your final score is: ${newScore}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-blue-600 font-semibold">Back</button>
        <div className="text-orange-500 font-bold text-lg">Score : {score}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: "100%" }}
        ></div>
      </div>

      {/* Render Questions */}
      {questions.map((question, index) => (
        <Question
          key={index}
          questionData={question}
          questionNumber={index + 1}
          onAnswerChange={handleAnswerChange} // Pass the handler to each Question component
        />
      ))}

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
