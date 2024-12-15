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
    path: "https://test123-english-app.vercel.app/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,  
  },
  {
    path: "https://test123-english-app.vercel.app/login",
    element: <LoginPage />,
  },
  {
    path: "https://test123-english-app.vercel.app/register",
    element: <RegisterPage />,
  },
  {
    path: "https://test123-english-app.vercel.app/test/cefr",
    element: <TestCefrPage />,
  },
  {
    path: "https://test123-english-app.vercel.app/result/cefr",
    element: <ResultCefrPage />,
  },
  {
    path: "https://test123-english-app.vercel.app/quiz/:id",
    element: <QuizPage />,
  },
  {
    path: "https://test123-english-app.vercel.app/review/quiz",
    element: <ReviewQuiz />,
  },
  {
    path: "https://test123-english-app.vercel.app/result/quiz",
    element: <QuizResultPage />,
  },
  {
    path: "https://test123-english-app.vercel.app/dashboard",
    element: <Dashboard />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
