import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewQuestion = ({ question, answers, correctAnswer, userAnswer, explanation, tips }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        {question.number}. {question.text}
      </h2>

      <div className="space-y-4">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`border rounded-lg p-3 cursor-pointer ${
              correctAnswer === answer.text
                ? 'bg-green-100 border-green-500'
                : userAnswer === answer.text
                ? 'bg-red-100 border-red-500'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="font-medium">
              {answer.label}. {answer.text}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-blue-100 rounded-lg p-4 mt-6">
        <h3 className="font-semibold mb-2">Penjelasan:</h3>
        <p className="text-gray-700">{explanation}</p>

        {/* Tips dihilangkan karena tidak tersedia */}
      </div>
    </div>
  );
};

const ReviewQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const attempt_id = localStorage.getItem('attempt_id');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/exam/attempt/${attempt_id}`);
        const data = await response.json();

        const transformedQuestions = data.questions_details.map((questionDetail, questionIndex) => {
          const correctChoice = questionDetail.choices.find((choice) => choice.is_correct);
          const answers = questionDetail.choices.map((choice, index) => ({
            label: String.fromCharCode(65 + index),
            text: choice.choice_text,
          }));

          return {
            number: questionIndex + 1,
            text: questionDetail.question_text,
            answers,
            correctAnswer: correctChoice?.choice_text || '',
            userAnswer: questionDetail.user_choice,
            explanation: correctChoice?.explanation || 'Tidak ada penjelasan.',
            tips: [], // Tidak ada tips dalam response
          };
        });

        setQuestions(transformedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading questions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="absolute top-6 left-6">
        <button
          className="flex items-center gap-2 text-blue-500 font-medium hover:text-blue-600"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('http://localhost:8000/dashboard');
            }
          }}
        >
          <span className="text-lg">&#8592;</span>
          <span>Back</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Review Exercise</h1>

      {questions.map((question, index) => (
        <ReviewQuestion
          key={index}
          question={question}
          answers={question.answers}
          correctAnswer={question.correctAnswer}
          userAnswer={question.userAnswer}
          explanation={question.explanation}
          tips={question.tips}
        />
      ))}
    </div>
  );
};

export default ReviewQuiz;
