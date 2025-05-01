import { useState, useEffect } from "react";
import Quiz from "../components/quiz.jsx";
import { fetchExamData, submitAnswers } from "../services/quiz.service.js";
import { useNavigate } from "react-router-dom";

const WrittenExpression = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [batchId, setBatchId] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // const questions = [
  //   {
  //     id: 1,
  //     text: "We spent our holidays in a hotel by the beach.",
  //     options: [
  //       { id: "A", text: "spent", isCorrect: false },
  //       { id: "B", text: "holidays", isCorrect: true },
  //       { id: "C", text: "hotel", isCorrect: false },
  //       { id: "D", text: "beach", isCorrect: false },
  //     ],
  //     explanation: {
  //       title: "Incorrect word explanation",
  //       content:
  //         "The word 'holidays' should be replaced with 'vacation' in American English.",
  //       tips: [
  //         "Use 'vacation' in American English.",
  //         "Use 'holidays' in British English.",
  //       ],
  //     },
  //   },
  //   {
  //     id: 2,
  //     text: "They were depended on their parents for support.",
  //     options: [
  //       { id: "A", text: "were", isCorrect: false },
  //       { id: "B", text: "depended", isCorrect: true },
  //       { id: "C", text: "on", isCorrect: false },
  //       { id: "D", text: "support", isCorrect: false },
  //     ],
  //     explanation: {
  //       title: "Incorrect word explanation",
  //       content:
  //         "The word 'depended' should be replaced with 'dependent' in this context.",
  //       tips: [
  //         "Check if the verb form aligns with the subject.",
  //         "Verify if it needs a verb or an adjective.",
  //       ],
  //     },
  //   },
  //   {
  //     id: 3,
  //     text: "They were depended on their parents for support.",
  //     options: [
  //       { id: "A", text: "were", isCorrect: false },
  //       { id: "B", text: "depended", isCorrect: true },
  //       { id: "C", text: "on", isCorrect: false },
  //       { id: "D", text: "support", isCorrect: false },
  //     ],
  //     explanation: {
  //       title: "Incorrect word explanation",
  //       content:
  //         "The word 'depended' should be replaced with 'dependent' in this context.",
  //       tips: [
  //         "Check if the verb form aligns with the subject.",
  //         "Verify if it needs a verb or an adjective.",
  //       ],
  //     },
  //   },
  // ];


  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchExamData("football", "A1", "written expression");
        setQuestions(data.questions);
        setBatchId(data.id);
        console.log(data.questions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);
    

  const handleSubmit = async (selectedOptions) => {
    console.log("Submitted answers:", selectedOptions);
        try {
          const answers = Object.entries(selectedOptions).map(([questionId, choiceId]) => ({
            question_id: parseInt(questionId),
            choice_id: choiceId,
          }));
          const result = await submitAnswers({ user_id: userId, batch_id: batchId, answers });
          console.log("user_id", userId, "batch_id", batchId, "answers", answers);
          localStorage.setItem("attempt_id", result.attempt_id);
          navigate("/result/quiz", { state: { score: result.score } });
        } catch (err) {
          alert("Error: " + err.message);
        }
  };

  return (
    <Quiz
      title="Quiz: Choose the incorrect word"
      questions={questions}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      enableUnderline={true}
    />
  );
};

export default WrittenExpression;