import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

export const ProtectRoutes = () => {
    const { cookies } = useAuth();
    return cookies.token ? <Outlet/> : <Navigate to='/error-403' exact />
};