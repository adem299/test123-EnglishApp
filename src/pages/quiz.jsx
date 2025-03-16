import React, { useEffect, useState } from "react";
import { fetchQuestions, submitAnswers } from "../services/quiz.service";
import { useNavigate, useParams } from "react-router-dom";

const Question = ({ questionData, questionNumber, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (choice) => {
    setSelectedOption(choice.id);
    onAnswerChange(questionNumber - 1, choice);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Question */}
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        {questionNumber}. {questionData.question_text}
      </h2>

      {/* Options */}
      <div className="space-y-4">
        {questionData.choices.map((choice) => (
          <div
            key={choice.id}
            onClick={() => handleOptionSelect(choice)}
            className={`border rounded-lg p-3 cursor-pointer ${
              selectedOption === choice.id
                ? "bg-blue-100 border-blue-200"
                : "hover:bg-gray-100"
            }`}
          >
            <span>{choice.choice_text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Quiz Page
const QuizPage = () => {
  const { id } = useParams();
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const progress =
    (answers.filter((answer) => answer?.choice_id !== null).length /
      questions.length) *
    100;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(id); 
        setQuestions(data.questions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerChange = (questionIndex, choice) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      question_id: questions[questionIndex].id,
      choice_id: choice.id,
    };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some((answer) => answer.choice_id === null)) {
      alert("Harap menjawab semua pertanyaan sebelum submit.");
      return;
    }
  
    const payload = {
      user_id: 3,
      batch_id: 1,
      answers: answers,
    };
  
    try {
      const result = await submitAnswers(payload);
  
      navigate("/result/quiz", { state: { score: result.score, percentage: result.percentage } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

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
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Render Questions */}
      {questions.map((question, index) => (
        <Question
          key={question.id}
          questionData={question}
          questionNumber={index + 1}
          onAnswerChange={handleAnswerChange}
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