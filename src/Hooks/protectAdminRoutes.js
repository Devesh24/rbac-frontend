import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';
import CryptoJS from "crypto-js";
import { CRYPTO_SEC } from '../config';

export const ProtectAdminRoutes = () => {
    const { cookies } = useAuth();
    let bytes, decryptedType;
    if(cookies.type)
    {
        bytes = CryptoJS.AES.decrypt(cookies.type, CRYPTO_SEC);
        decryptedType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return cookies.token && decryptedType==="Admin" ? <Outlet/> : <Navigate to='/error-403' exact />
};