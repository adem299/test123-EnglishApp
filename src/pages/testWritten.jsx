import { useState, useEffect } from "react";

const TestWritten = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(80);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const questions = [
    {
      id: 1,
      text: "We spent our holidays in a hotel by the beach.",
      options: [
        { id: "A", text: "spent", isCorrect: false },
        { id: "B", text: "holidays", isCorrect: true },
        { id: "C", text: "hotel", isCorrect: false },
        { id: "D", text: "beach", isCorrect: false },
      ],
      explanation: {
        title: "Incorrect word explanation",
        content:
          "The word 'holidays' should be replaced with 'vacation' in American English.",
        tips: [
          "Use 'vacation' in American English.",
          "Use 'holidays' in British English.",
        ],
      },
    },
    {
      id: 2,
      text: "They were depended on their parents for support.",
      options: [
        { id: "A", text: "were", isCorrect: false },
        { id: "B", text: "depended", isCorrect: true },
        { id: "C", text: "on", isCorrect: false },
        { id: "D", text: "support", isCorrect: false },
      ],
      explanation: {
        title: "Incorrect word explanation",
        content:
          "The word 'depended' should be replaced with 'dependent' in this context.",
        tips: [
          "Check if the verb form aligns with the subject.",
          "Verify if it needs a verb or an adjective.",
        ],
      },
    },
    {
      id: 3,
      text: "They were depended on their parents for support.",
      options: [
        { id: "A", text: "were", isCorrect: false },
        { id: "B", text: "depended", isCorrect: true },
        { id: "C", text: "on", isCorrect: false },
        { id: "D", text: "support", isCorrect: false },
      ],
      explanation: {
        title: "Incorrect word explanation",
        content:
          "The word 'depended' should be replaced with 'dependent' in this context.",
        tips: [
          "Check if the verb form aligns with the subject.",
          "Verify if it needs a verb or an adjective.",
        ],
      },
    },
  ];
  

  const totalQuestions = questions.length;
  const progressPercentage = Math.min((answeredQuestions / totalQuestions) * 100, 100);


  const handleOptionSelect = (questionId, optionId) => {
    if (!isSubmitted) {
      setSelectedOptions((prevSelected) => ({
        ...prevSelected,
        [questionId]: optionId,
      }));
    }
  };
  

  useEffect(() => {
    const answeredCount = Object.keys(selectedOptions).length;
    setAnsweredQuestions(answeredCount);
  }, [selectedOptions]);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const goBack = () => {
    console.log("Go back button clicked");
  };

  const getUnderlinedText = (text, options) => {
    let words = text.split(" ");
  
    return words.map((word, index) => {
      let cleanWord = word.replace(/[.,]/g, "").trim();
  
      const isOption = options.some(
        (option) => option.text.toLowerCase() === cleanWord.toLowerCase()
      );
  
      return (
        <span key={index} className={isOption ? "underline" : ""}>
          {word}{" "}
        </span>
      );
    });
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">
        Quiz: Choose the incorrect word
      </h1>

      {/* Header */}
      <div className="p-4 border-b flex items-center">
        <button className="flex items-center text-gray-700" onClick={goBack}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <span className="ml-2">Back</span>
        </button>
        <div className="ml-auto">
          <span className="bg-orange-500 text-white px-4 py-2 rounded-md">
            Score : {score}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200">
        <div
          className="absolute h-2 bg-green-400"
          style={{ width: `${(progressPercentage)}%` }}
        ></div>
      </div>
      <div className="flex justify-between px-4 py-1 text-xs text-gray-500">
        {isSubmitted ? <span className="text-green-500">Complete</span> : <span className="text-red-500">Uncomplete</span>}
        
        <span>
          {answeredQuestions}/{totalQuestions} Question
        </span>
      </div>

      {questions.map((question) => {
        const selectedOption = selectedOptions[question.id];

        return (
          <div key={question.id} className="p-4 border-b">
            <h2 className="font-bold mb-4">
              B. Choose the incorrect word part of the sentence.
            </h2>

            <div className="flex items-start mb-6">
              <div className="bg-gray-500 text-white rounded-md w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {question.id}
              </div>
              <p className="mt-1">{getUnderlinedText(question.text, question.options)}</p>
            </div>

            {question.options.map((option) => (
              <div
              key={option.id}
              className={`border rounded-md mb-2 flex items-center cursor-pointer 
                ${
                  isSubmitted
                    ? selectedOption === option.id
                      ? option.isCorrect
                        ? "bg-green-100 border-green-400"
                        : "bg-red-100 border-red-400"
                      : "hover:bg-gray-50"
                    : selectedOption === option.id
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-gray-50"
                }
                `}
                onClick={() => handleOptionSelect(question.id, option.id)}
              >
                 <div
                  className={`m-1 w-10 h-10 flex items-center justify-center border rounded-lg
                    ${
                      isSubmitted ?
                       selectedOption === option.id
                        ? option.isCorrect
                          ? "bg-green-400 text-white"
                          : "bg-red-400 text-white"
                        : "bg-gray-100 rounded-lg "
                        : selectedOption === option.id
                    ? "bg-blue-300 rounded-lg"
                    : "hover:bg-gray-50"
                    }
                  `}
                >
                  {option.id}
                </div>
                <div className="px-4 py-3 flex-grow">{option.text}</div>
                {isSubmitted &&(selectedOption === option.id && option.isCorrect) && (
                  <div className="pr-4">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Explanation Section */}
            {isSubmitted && (
              <div className="bg-blue-50 p-4 mt-4 rounded-md">
                <h3 className="font-bold text-gray-700">
                  {question.explanation.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  {question.explanation.content}
                </p>
                <h4 className="font-bold mt-3 text-gray-700">Tips :</h4>
                <ol className="list-decimal pl-6 text-sm text-gray-700 mt-1">
                  {question.explanation.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );
      })}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4"
            onClick={handleSubmit}
        >
            Submit
        </button>

      </div>
    </div>
  );
};

export default TestWritten;
