import { useState, useEffect } from "react";
import dashboardImage from "../assets/dashboard.png";
import quizImage1 from "../assets/quiz-1.png";
import profileImg from "../assets/profile-img.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { fetchQuizData } from "../services/quiz.service";
import { LeaderboardRounded, Settings, SearchRounded } from "@mui/icons-material";
import Button from "../components/Elements/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
        setError("Failed to fetch quiz data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadQuizData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-inter">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white transition-all duration-300 fixed h-full shadow-xl z-10">
        <div className="p-4 lg:p-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold hidden lg:block">TEST123</span>
          </div>
        </div>
        <nav className="mt-8">
          <a
            href="#"
            className="flex items-center px-4 py-3 lg:px-6 text-sm font-medium bg-blue-600/50 rounded-l-full hover:bg-blue-600 transition-colors"
          >
            <DashboardIcon className="mr-2" />
            <span className="hidden lg:block">Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 lg:px-6 mt-2 text-sm font-medium hover:bg-blue-600 hover:rounded-l-full transition-colors"
          >
            <LeaderboardRounded className="mr-2" />
            <span className="hidden lg:block">Leaderboard</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 lg:px-6 mt-2 text-sm font-medium hover:bg-blue-600 hover:rounded-l-full transition-colors"
          >
            <Settings className="mr-2" />
            <span className="hidden lg:block">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:ml-64">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-white/10 backdrop-blur-md shadow-lg rounded-xl w-full max-w-md px-3 py-2 border border-white/20">
            <SearchRounded className="text-gray-500" />
            <input
              type="text"
              placeholder="Search quizzes..."
              className="flex-1 py-2 px-3 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md shadow-lg rounded-xl py-2 px-4 border border-white/20">
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{username}</p>
              <p className="text-xs text-gray-500">Level A1</p>
            </div>
          </div>
        </header>

        {/* Banner */}
        <div className="mt-6 relative w-full rounded-2xl shadow-lg overflow-hidden">
          <img
            src={dashboardImage}
            alt="Banner"
            className="w-full h-48 lg:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-transparent flex items-center p-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Start Learning Today!</h2>
              <Button
                className="mt-3 text-blue-700 bg-white rounded-lg px-4 py-2 hover:bg-blue-100 transition-colors"
                onClick={() => navigate("/test")}
              >
                Explore Quizzes
              </Button>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Continue Learning</h2>
          <div className="flex gap-x-4 mb-6">
          <Button
            className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center"
            onClick={() => navigate("/test/structure-grammar")}
          >
            Structure Grammar
          </Button>
          <Button
            className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center"
            onClick={() => navigate("/test/written")}
          >
            Written Expression
          </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-gray-500 animate-pulse">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              quizData?.slice(-4).map((quiz) => (
                <a
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="block bg-white rounded-xl shadow-lg p-4 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={quiz.image || quizImage1}
                    alt={quiz.title}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                  <p className="mt-3 font-semibold text-gray-800">{quiz.category}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{quiz.description}</p>
                </a>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;