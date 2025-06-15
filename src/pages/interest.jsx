import { useState } from "react";
import { Check } from "lucide-react"; // atau gunakan ikon lainnya
import ProgressBar from "../pages/progress";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const interests = [
  { id: "Fitness", label: "FITNESS", img: "/src/assets/fitness.png" },
  { id: "design", label: "DESIGN", img: "/src/assets/design.webp" },
  { id: "education", label: "EDUCATION", img: "/src/assets/education.jpeg" },
  { id: "Sports", label: "SPORTS", img: "/src/assets/sports.jpeg" },
  { id: "home", label: "PROGRAMMING", img: "/src/assets/programming.jpeg" },
  { id: "Food & Drink", label: "FOOD&DRINK", img: "/src/assets/f&d.jpeg" },
  { id: "Automotive", label: "AUTOMOTIVE", img: "/src/assets/automotive.jpeg" },
  { id: "gardening", label: "POLITICS", img: "/src/assets/politics.jpeg" },
  { id: "cars", label: "MEDICAL", img: "/src/assets/medical.jpeg" },
  { id: "traveling", label: "TRAVEL", img: "/src/assets/travel.jpeg" },
];


const InterestPage = () => {
  const [selected, setSelected] = useState([]);
  const toggleInterest = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const navigate = useNavigate();
  const handleNext = () => {
    if (selected.length > 0) {
      try { 
        const user_id = localStorage.getItem("user_id");
        const interestsData = selected.map((id) => {
          const interest = interests.find((i) => i.id === id);
          return interest.id;
        });
        
        fetch(`http://localhost:8000/profile/${user_id}/interests`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interestsData),
        });
        navigate("/test/cefr");
      } catch (error) {
        console.error("Error saving interests:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 p-6 animate-fadeIn">
      {/* Progress bar di atas */}
      <ProgressBar step={1} />
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl w-full">
          {" "}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Choose your interests
          </h2>
          <div className="grid grid-cols-5 gap-6">
            {interests.map((interest) => (
              <div
                key={interest.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => toggleInterest(interest.id)}
              >
                <div className="relative w-20 h-20">
                  <img
                    src={interest.img}
                    alt={interest.label}
                    className={`rounded-full w-full h-full object-cover border-4 ${
                      selected.includes(interest.id)
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  />
                  {selected.includes(interest.id) && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-700 font-medium text-center">
                  {interest.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-gray-300 disabled:opacity-50"
              disabled={selected.length === 0}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestPage;
