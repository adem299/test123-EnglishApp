import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useRegisterUser = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      console.log('User data being sent:', userData);
      const res = await axios.post('https://toeflify-service-473598678247.asia-southeast2.run.app/users/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(`Registration successful! Welcome, ${res.data.fullname}.`);
      console.log('Registration Success:', res.data);
      // Arahkan ke halaman '/test/cefr'
      navigate('/test/cefr');
    } catch (err) {
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, error, registerUser };
};

export default useRegisterUser;
