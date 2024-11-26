/*
    AppProvider serves as a wrapper component to provide global context or utilities to the entire application. In this case, it uses UserProvider for managing authentication-related state and logic.
*/ 

import { UserProvider } from "./auth";

const AppProvider = ({ children }) => (
    <>
        <UserProvider>{ children }</UserProvider>
    </>
);

export default AppProvider;