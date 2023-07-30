import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { EmailValido } from "../../functions/validaciones";
import axios from "axios";
import { API_URL } from "../../global/api";
import { LOCAL_STORAGE_KEY } from "../../contexts/AutenticacionContext";

const Login = () => {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function IniciarSesion(ev: any) {
    ev.preventDefault();

    if (!correo.length) return alert('Ingrese el correo');
    if (!EmailValido(correo)) return alert('El correo es inválido');
    if (!contrasena.length) return alert('Ingrese la contraseña');

    try {
      const response = await axios.post(API_URL+"/admin/login", {
        correo,
        contrasena
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, response.data.data.jwt);
      navigate('/', {replace: true});
    } catch (error: any) {
      console.log(error);
      alert(error.response);
    }

  }

  return (
    <form onSubmit={IniciarSesion}>
      <div className="my-4 mb-8">
        <h1 className="font-spacemono text-4xl font-medium">RadiussNet (Admin)</h1>
        <legend className="font-spacemono text-4xl font-bold">Iniciar Sesión</legend>
      </div>
      
      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-user text-red-900"></i>
        <input value={correo} onInput={(ev: any) => setCorreo(ev.target.value)} type="text" placeholder="Correo" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-lock text-red-900"></i>
        <input value={contrasena} onInput={(ev: any) => setContrasena(ev.target.value)} type="password" placeholder="Contraseña" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="link gap-y-2 my-4">
        <Link to={'/crear-cuenta'} className="font-cursive">Crear Cuenta</Link>
        <Link to={'/recuperacion'} className="font-cursive">¿Olvidaste tu contraseña?</Link>
      </div>

      <button type="submit" className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
