import React, { createContext, useReducer } from 'react';

export const CalendarContext = createContext();

export const calendarReducer = (state, action) => {
  switch(action.type) {
    case 'SET_CALENDAR':
      return {
        ...state,
        calendar: action.payload.calendar
      };
    case 'ADD_EVENT':
      return {
        ...state,
        calendar: {
          ...state.calendar,
          events: [...state.calendar.events, action.payload.event]
        }
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        calendar: {
          ...state.calendar,
          events: state.calendar.events.filter(event => event._id !== action.payload.eventId)
        }
      };
    default:
      return state;
  }
};

export const CalendarContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(calendarReducer, {calendar: { events: [] }});

  return (
    <CalendarContext.Provider value={{...state, dispatch}}>
      {children}
    </CalendarContext.Provider>
  );
};
