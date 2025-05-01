import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../components/quiz.jsx";
import { fetchExamData, submitAnswers } from "../services/quiz.service";

const Structure = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [batchId, setBatchId] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchExamData("motogp", "A1", "Structure grammar");
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
      const result = await submitAnswers({ user_id: userId, batch_id: batchId, answers });
      localStorage.setItem("attempt_id", result.attempt_id);
      navigate("/result/quiz", { state: { score: result.score } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Quiz
      title="Quiz: Complete this sentence"
      questions={questions}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      enableUnderline={false}
    />
  );
};

export default Structure;