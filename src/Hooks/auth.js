import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";

// Creating a context for user authentication data and functions
const UserContext = createContext();


/*
  UserProvider component wraps around the application to provide user-related state (like cookies) and functions (like logout) to the rest of the app.
*/
export const UserProvider = ({ children }) => {
  // useCookies hook to manage cookies like token and type
  const [cookies, setCookies, removeCookie] = useCookies();

  /**
    Logout function clears the authentication cookies (token and type) and redirects the user to the login page after a short delay.
  */
  const logout = () => {
    removeCookie("token");
    removeCookie("type");
    setTimeout(() => {
      window.location.href = "./login"
    }, 1000);
  };

  // Memoizing the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      cookies,
      logout,
    }),
    [cookies] // Only re-run when cookies change
  );

  // Providing the value to the children components
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


/*
  Custom hook for accessing the user authentication context.
  This allows child components to use authentication-related data and functions.
*/
export const useAuth = () => {
  return useContext(UserContext);
};