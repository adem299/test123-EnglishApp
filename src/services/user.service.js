import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});

const loginUser = (username, password, callback) => {
  api.post("/users/login", { username, password })
      .then((res) => callback(res.data))
      .catch((err) => callback({ err }));
};

const registerUser = (fullname, username, password, interests, callback) => {
  api.post("/users/register", { fullname, username, password, interests })
      .then((res) => callback(res.data))
      .catch((err) => callback({ err }));
};

export { loginUser, registerUser };








// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const useRegisterUser = () => {
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const registerUser = async (userData) => {
//     setLoading(true);
//     try {
//       console.log('User data being sent:', userData);
//       const res = await axios.post('http://localhost:8000/users/register', userData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setMessage(`Registration successful! Welcome, ${res.data.fullname}.`);
//       console.log('Registration Success:', res.data);
//       // Arahkan ke halaman '/test/cefr'
//       navigate('/test/cefr');
//     } catch (err) {
//       console.error('Error response:', err.response);
//       setError(err.response?.data?.message || 'Registration failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { message, loading, error, registerUser };
// };

// export default useRegisterUser;
