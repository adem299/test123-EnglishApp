export const fetchQuizDataById = async (id) => {
    try {
      const response = await fetch(
        `https://toeflify-service-473598678247.asia-southeast2.run.app/exam/${id}/`
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
        `https://toeflify-service-473598678247.asia-southeast2.run.app/exams`
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
    const API_URL = `https://toeflify-service-473598678247.asia-southeast2.run.app/exam/${examId}/questions`;
  
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch questions.");
    }
  
    return await response.json();
  };
  
  export const submitAnswers = async (payload) => {
    const SUBMIT_API_URL =
      "https://toeflify-service-473598678247.asia-southeast2.run.app/exam/submit";
  
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
  