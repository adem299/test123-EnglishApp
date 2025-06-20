import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchExamData = async (userId, subject) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/exam/findByUserSubject`, {
      user_id: userId,
      subject: subject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exam:', error);
    throw error;
  }
};

export const fetchTestData = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/assessment/findByUser`, {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exam:', error);
    throw error;
  }
};

export const fetchQuizDataById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/exam/${id}/`
      );
      if (!response.ok) {
        throw new Error(`Error fetching quiz data: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


export const fetchQuizData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/exams`
      );
      if (!response.ok) {
        throw new Error(`Error fetching quiz data: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  


  export const fetchQuestions = async (examId) => {
    const API_URL = `http://localhost:8000/exam/${examId}/questions`;
  
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch questions.");
    }
  
    return await response.json();
  };
  
  export const submitAnswers = async (payload) => {
    const SUBMIT_API_URL =
      "http://localhost:8000/exam/submit";
  
    const response = await fetch(SUBMIT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit answers.");
    }
  
    return await response.json();
  };

  export const submitTestAnswers = async (payload) => {
    const SUBMIT_API_URL =
      "http://localhost:8000/assessment/submit";
  
    const response = await fetch(SUBMIT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit answers.");
    }
  
    return await response.json();
  };
  