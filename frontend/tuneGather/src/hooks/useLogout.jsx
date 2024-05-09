import { useAuthContext
 } from "./useAuthContext";

import { useCalendarContext } from "./useCalendarContext";


export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: calendarDispatch } = useCalendarContext();
  const  logout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    dispatch({ type: 'LOGOUT' });
    calendarDispatch({ type: 'SET_CALENDAR' , payload: null });

  }
  return { logout };
}
