import { useEffect, useState } from "react";
import { fetchExamData, submitAnswers } from "../services/quiz.service";
import { useNavigate } from "react-router-dom";

const Question = ({ questionData, questionNumber, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option.id);
    onAnswerChange(questionNumber - 1, option);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        {questionNumber}. {questionData.text}
      </h2>
      <div className="space-y-4">
        {questionData.options.map((option, index) => (
          <div
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer ${
              selectedOption === option.id
                ? "bg-blue-100 border-blue-200"
                : "hover:bg-gray-100"
            }`}
          >
            <div
              className={`m-1 w-10 h-10 flex items-center justify-center border rounded-lg ${
                selectedOption === option.id
                  ? "bg-blue-300 border-blue-200"
                  : "hover:bg-gray-100"
              }`}
            >
              {String.fromCharCode(65 + index)}
            </div>
            <div>{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [batch_id, setBatch_id] = useState(0);

const answeredQuestions = answers.filter((ans) => ans !== undefined).length;
const totalQuestions = questions.length;


  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchExamData("ufc", "A1", "Structure grammar");
        setQuestions(data.questions);
        setBatch_id(data.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerChange = (questionIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      question_id: questions[questionIndex].id,
      choice_id: option.id,
    };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    if (answers.length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const result = await submitAnswers({ user_id: user_id, batch_id: batch_id, answers });
      localStorage.setItem("attempt_id", result.attempt_id);
      // console.log(result);
      navigate("/result/quiz", { state: { score: result.score } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-center">Loading questions...</p>
      </div>
    );
  
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">Quiz: Complete this sentence</h1>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div className="flex flex-col">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${
                  (answers.filter((ans) => ans !== undefined).length /
                    questions.length) *
                  100
                }%`,
              }}
            ></div>
            <span className="text-gray-600 text-sm text-end">
              {answeredQuestions}/{totalQuestions} Question
            </span>
          </div>
        </div>

        {questions.map((question, index) => (
          <Question
            key={question.id}
            questionData={question}
            questionNumber={index + 1}
            onAnswerChange={handleAnswerChange}
          />
        ))}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
