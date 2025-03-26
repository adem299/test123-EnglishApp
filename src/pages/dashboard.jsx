import { useState, useEffect } from "react";
import dashboardImage from "../assets/dashboard.png";
import quizImage1 from "../assets/quiz-1.png";
import profileImg from "../assets/profile-img.png";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { fetchQuizData } from "../services/quiz.service";

import {
  LeaderboardRounded,
  Settings,
  SearchRounded,
} from "@mui/icons-material";
import Button from "../components/Elements/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        setQuizData(data);
      } catch (err) {
        setError("Failed to fetch quiz data.");
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-bold">TEST123</span>
          </div>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            className="flex items-center px-6 py-2 text-sm font-medium bg-blue-500 rounded-l-full"
          >
            <div className="flex items-center gap-x-2">
              <DashboardIcon />
              Dashboard
            </div>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 mt-3 text-sm font-medium hover:bg-blue-500 hover:rounded-l-full"
          >
            <div className="flex items-center gap-x-2">
              <LeaderboardRounded />
              Leaderboard
            </div>
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-2 mt-3 text-sm font-medium hover:bg-blue-500 hover:rounded-l-full"
          >
            <div className="flex items-center gap-x-2">
              <Settings />
              Settings
            </div>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div className="flex items-center bg-white shadow-md rounded-lg w-full max-w-md px-2">
            <SearchRounded />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg max-w-md py-1.5 px-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{username}</p>
              <p className="text-xs text-gray-500">Level A1</p>
            </div>
          </div>
        </header>

        {/* Banner */}
        <div className="mt-5 w-full">
          <img
            src={dashboardImage}
            alt="Banner"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Continue Learning */}
        <section className="mt-5 m">
          <h2 className="text-lg font-bold mb-4">Continue Learning</h2>
          <div className="flex gap-x-4">
            <Button
              className="bg-blue-300 border border-blue-200 text-blue-700 rounded-xl"
              onClick={() => (window.location.href = "/test/structure-grammar")}
            >
              Structure Grammar
            </Button>
            <Button
              className="bg-blue-300 border border-blue-200 text-blue-700 rounded-xl"
              onClick={() => (window.location.href = "/test/written")}
            >
              Written Expression
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              quizData.slice(-4).map((quiz) => ( // show the last 4 quizzes
                <a
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="block bg-white rounded-lg shadow-md p-4"
                >
                  <img
                    src={quiz.image || quizImage1}
                    alt={quiz.title}
                    className="rounded-lg"
                  />
                  <p className="mt-2 font-semibold">{quiz.category}</p>
                  <p className="text-sm text-gray-500">{quiz.description}</p>
                </a>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
