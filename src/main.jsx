import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import ErrorPage from './pages/404.jsx'
import ResultCefrPage from './pages/resultCefr.jsx'
import TestCefrPage from './pages/testCefr.jsx'
import Home from './pages/home.jsx'
import QuizResultPage from './pages/quizResult.jsx'
import ReviewQuiz from './pages/reviewQuiz.jsx'
import Structure from './pages/structure.jsx'
import WrittenExpression from './pages/writtenExpression.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/test/cefr',
    element: <TestCefrPage />,
  },
  {
    path: '/result/cefr',
    element: <ResultCefrPage />,
  },
  {
    path: '/quiz/:id',
    element: <Structure />,
  },
  {
    path: '/test/structure-grammar',
    element: <Structure />,
  },
  {
    path: '/review/quiz',
    element: <ReviewQuiz />,
  },
  {
    path: '/result/quiz',
    element: <QuizResultPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/test/written',
    element: <WrittenExpression />,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
