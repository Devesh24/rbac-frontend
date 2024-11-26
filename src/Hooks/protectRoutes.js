import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';


/**
   ProtectRoutes component is a wrapper that protects certain routes by checking if the user has a valid authentication token. If the token is present, the protected routes are rendered; otherwise, the user is redirected to the 403 error page.
*/
export const ProtectRoutes = () => {
    // Accessing the cookies using the custom `useAuth` hook to get the authentication token
    const { cookies } = useAuth();

    // If the user has a valid token, render the protected routes (outlet)
    // Otherwise, redirect to the error page (403 Forbidden)
    return cookies.token ? <Outlet/> : <Navigate to='/error-403' exact />
};