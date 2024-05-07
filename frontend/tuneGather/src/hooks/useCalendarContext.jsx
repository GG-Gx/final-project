import React from 'react';
import { CalendarContext } from '../context/CalendarContext.jsx';


import { useContext } from 'react';

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarContextProvider');
  }

  return context;
};


