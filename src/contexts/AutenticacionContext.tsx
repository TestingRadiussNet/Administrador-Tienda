import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { API_URL } from "../global/api";

const AutenticacionContextDefault: any = {
    auth: {
        jwt: null,
        data: null,
    },
    cargando: true,
}

const AutenticacionContext = createContext(AutenticacionContextDefault);

export const LOCAL_STORAGE_KEY = "radiuss-net-admin";

export const AutenticacionProvider = ({children}: any) => {
    const [auth, setAuth] = useState(AutenticacionContextDefault.auth);
    const [cargando, setCargando] = useState(AutenticacionContextDefault.cargando);

    const location = useLocation();

    useEffect(() => {
        const autenticar = async () => {            
            const jwt = localStorage.getItem(LOCAL_STORAGE_KEY)
            if (!jwt) {
                setCargando(false);
                return;
            }
            try {
                const response = await axios.get(API_URL+'/admin/datos',{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`                   
                    }
                })
                setAuth({jwt, data: response.data.data});
            } catch (error) {
                console.log(error)
                setAuth(AutenticacionContextDefault.auth)
            } finally {
                setCargando(false)
            }
        }
        autenticar()
    }, [location]);
    const cerrarSesion = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setAuth(AutenticacionContextDefault.auth);
    }
    return (
        <AutenticacionContext.Provider value={{auth, setAuth, cargando, setCargando, cerrarSesion}}>
            {children}
        </AutenticacionContext.Provider>
    )
}

export default AutenticacionContext;