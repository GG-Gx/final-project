
import React, { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: {
          user: action.payload.user
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null
        }
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { auth: { user: null } });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: { user: JSON.parse(user) } });
    } 

  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};