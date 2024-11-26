import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';
import CryptoJS from "crypto-js";
import { CRYPTO_SEC } from '../config';


/*
   ProtectAdminRoutes component is a wrapper that protects admin routes by checking if the user has a valid token and has an "Admin" type role. 
   It either renders the protected routes or redirects to an error page.
*/
export const ProtectAdminRoutes = () => {
    // Accessing the cookies using the custom `useAuth` hook
    const { cookies } = useAuth();
    let bytes, decryptedType;
    if(cookies.type) // If the `type` cookie is present, decrypt it to check the user role
    {
        // Decrypt the type of the user (e.g., "Admin") using the encryption key from the config
        bytes = CryptoJS.AES.decrypt(cookies.type, CRYPTO_SEC);
        decryptedType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    // Check if the user has a valid token and is an "Admin"
    // If both conditions are true, render the protected routes (outlet)
    // Otherwise, redirect to the error page (403 Forbidden)
    return cookies.token && decryptedType==="Admin" ? <Outlet/> : <Navigate to='/error-403' exact />
};