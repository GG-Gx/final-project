import { useAuthContext
 } from "./useAuthContext";


export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const  logout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    dispatch({ type: 'LOGOUT' });
  }
  return { logout };
}
