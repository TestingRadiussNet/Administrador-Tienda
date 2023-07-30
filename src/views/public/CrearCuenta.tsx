import { useState } from 'react';
import '../../styles/formularios.css';
import { Link, useNavigate } from 'react-router-dom';
import { EmailValido } from '../../functions/validaciones';
import axios from 'axios';
import { API_URL } from '../../global/api';

const CrearCuenta = () => {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function CrearCuenta(ev: any) {
    ev.preventDefault();

    if (!correo.length) {
      alert('Falta el correo');
    } else if (!EmailValido(correo)) {
      alert('El correo es inválido');
    } else if (!contrasena.length) {
      alert('Falta la contraseña');
    } else {

      //TODA LA LÓGICA
      try {
        const respuesta = await axios.post(API_URL+"/admin/crear-cuenta", {
          correo,
          contrasena
        });

        alert(respuesta.data['msg']);
        navigate('/login', {replace: true});
      } catch (error: any) {
        console.log(error);
        alert(error.response);
      }
    }
  }
 
  return (
    <form onSubmit={CrearCuenta}>
      <div className="icon">
        <i className="fa-solid fa-user-circle"></i>
      </div>

      <div className="my-4 mb-8">
        <h1 className="font-spacemono text-4xl font-medium">RadiussNet (Admin)</h1>
        <legend className="font-spacemono text-4xl font-bold">Crear Cuenta</legend>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-envelope text-red-900"></i>
        <input value={correo} onInput={(ev: any) => setCorreo(ev.target.value)} type="email" placeholder="Correo" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-lock text-red-900"></i>
        <input value={contrasena} onInput={(ev: any) => setContrasena(ev.target.value)} type="password" placeholder="Contraseña" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="link gap-y-2 my-4">
        <Link to={'/login'} className="font-cursive">¿Ya tienes una cuenta?</Link>
      </div>

      <button type="submit" className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal">Crear Cuenta</button>
    </form>
  );
};

export default CrearCuenta;
