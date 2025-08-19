import { checkToken } from "../components/utils/tokenService";

export const checkAuth = () => {
  const token = checkToken();
  
  if (!token) {
    // Only redirect if current path is NOT already '/login'
    if (window.location.pathname !== '/') {
      console.log("No token found, redirecting to /login...");
      
    
        // Clear user data from localStorage
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userUsername');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userJoinDate');
        window.location.href = '/';

    } else {
      console.log("Already on /login page, no redirect needed.");
    }
  }
};