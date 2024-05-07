import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useSignup = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setIsLoading(false);
      } else {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(data));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: { user: data } });

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return { error, isLoading, signup };
};




  
