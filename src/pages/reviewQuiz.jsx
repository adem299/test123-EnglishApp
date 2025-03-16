import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewQuestion = ({ question, answers, correctAnswer, userAnswer, explanation, tips }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Nomor dan Pertanyaan */}
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        {question.number}. {question.text}
      </h2>

      {/* Pilihan Jawaban */}
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <div key={index} className={`border rounded-lg p-3 cursor-pointer ${correctAnswer === answer.text ? 'bg-green-100 border-green-500' : userAnswer === answer.text ? 'bg-red-100 border-red-500' : 'hover:bg-gray-100'}`}>
            <span className="font-medium">
              {answer.label}. {answer.text}
            </span>
          </div>
        ))}
      </div>

      {/* Penjelasan */}
      <div className="bg-blue-100 rounded-lg p-4 mt-6">
        <h3 className="font-semibold mb-2">Penjelasan:</h3>
        <p className="text-gray-700">{explanation}</p>

        {/* Tips */}
        {tips && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Tips:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://toeflify-service-473598678247.asia-southeast2.run.app/exam/history/3');
        const data = await response.json();

        const transformedQuestions = data.exam_history.slice(-1)[0].questions_details.map((questionDetail, questionIndex) => ({
          number: questionIndex + 1,
          text: questionDetail.question_text,
          answers: questionDetail.choices.map((choice, index) => ({
            label: String.fromCharCode(65 + index), // A, B, C, D
            text: choice.choice_text,
          })),
          correctAnswer: questionDetail.choices.find((choice) => choice.choice_text === questionDetail.chosen_choice && questionDetail.is_correct)?.choice_text,
          userAnswer: questionDetail.chosen_choice,
          explanation: questionDetail.explanation,
          tips: questionDetail.tips ? [questionDetail.tips] : [],
        }));

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
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          className="flex items-center gap-2 text-blue-500 font-medium hover:text-blue-600"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1); // Go back to the previous page
            } else {
              navigate('https://test123-english-app.vercel.app/dashboard'); // Fallback to the dashboard if no history
            }
          }}
        >
          <span className="text-lg">&#8592;</span> {/* Arrow Back Icon */}
          <span>Back</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Review Exercise</h1>

      {questions.map((question, index) => (
        <ReviewQuestion key={index} question={question} answers={question.answers} correctAnswer={question.correctAnswer} userAnswer={question.userAnswer} explanation={question.explanation} tips={question.tips} />
      ))}
    </div>
  );
};

export default ReviewQuiz;
