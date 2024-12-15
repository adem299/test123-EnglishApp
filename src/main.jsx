import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import ErrorPage from './pages/404.jsx'
import ResultCefrPage from './pages/resultCefr.jsx'
import TestCefrPage from './pages/testCefr.jsx'
import QuizPage from './pages/quiz.jsx'
import Dashboard from './pages/dashboard.jsx'
import QuizResultPage from './pages/quizResult.jsx'
import ReviewQuiz from './pages/reviewQuiz.jsx'

const router = createBrowserRouter([
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,  
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/login",
    element: <LoginPage />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/register",
    element: <RegisterPage />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/test/cefr",
    element: <TestCefrPage />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/result/cefr",
    element: <ResultCefrPage />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/quiz/:id",
    element: <QuizPage />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/review/quiz",
    element: <ReviewQuiz />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/result/quiz",
    element: <QuizResultPage />,
  },
  {
    path: "https://test123-english-a7p9iddok-ade-mulyanas-projects.vercel.app/register/dashboard",
    element: <Dashboard />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
