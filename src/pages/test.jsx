import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../components/quiz.jsx";
import { fetchTestData, submitTestAnswers } from "../services/quiz.service.js";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [batchId, setBatchId] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    console.log("User ID:", userId);
    const loadQuestions = async () => {
      try {
        const data = await fetchTestData(userId);
        setQuestions(data.questions);
        setBatchId(data.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleSubmit = async (selectedOptions) => {
    try {
      const answers = Object.entries(selectedOptions).map(([questionId, choiceId]) => ({
        question_id: parseInt(questionId),
        choice_id: choiceId,
      }));
      const result = await submitTestAnswers({ user_id: userId, batch_id: batchId, answers });
      localStorage.setItem("attempt_id", result.attempt_id);
      navigate("/result/quiz", { state: { score: result.cefr_score, percentage: result.percentage } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Quiz
      title="Test: Complete this sentence"
      questions={questions}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      enableUnderline={true}
    />
  );
};

export default Test;