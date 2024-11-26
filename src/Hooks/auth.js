import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies();

  const logout = () => {
    removeCookie("token");
    removeCookie("type");
    setTimeout(() => {
      window.location.href = "./login"
    }, 1000);
  };


  const value = useMemo(
    () => ({
      cookies,
      logout,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};