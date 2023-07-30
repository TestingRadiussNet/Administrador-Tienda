import { useState } from 'react';
import '../../styles/formularios.css';
import { Link } from 'react-router-dom';
import { EmailValido } from '../../functions/validaciones';
import axios from 'axios';
import { API_URL } from '../../global/api';

const CrearCuenta = () => {

  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function CrearCuenta(ev: any) {
    ev.preventDefault();

    if (!nombre.length) {
      alert('Falta el nombre');
    } else if (!paterno.length) {
      alert('Falta el apellido paterno');
    } else if (!materno.length) {
      alert('Falta el apellido materno');
    } else if (!correo.length) {
      alert('Falta el correo');
    } else if (!EmailValido(correo)) {
      alert('El correo es inválido');
    } else if (!telefono.length) {
      alert('Falta el teléfono');
    } else if (!contrasena.length) {
      alert('Falta la contraseña');
    } else {

      //TODA LA LÓGICA
      try {
        const respuesta = await axios.post(API_URL+"/admin/crear-cuenta", {
          
        })
      } catch (error) {

      }
    }
  }
 
  return (
    <form onSubmit={CrearCuenta}>
      <div className="icon">
        <i className="fa-solid fa-user-circle"></i>
      </div>

      <div className="my-4 mb-8">
        <h1 className="font-spacemono text-4xl font-medium">RadiussNet</h1>
        <legend className="font-spacemono text-4xl font-bold">Crear Cuenta</legend>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-user text-red-900"></i>
        <input value={nombre} onInput={(ev: any) => setNombre(ev.target.value)} type="text" placeholder="Nombres" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-contact-card text-red-900"></i>
        <input value={paterno} onInput={(ev: any) => setPaterno(ev.target.value)} type="text" placeholder="Apellido Paterno" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-contact-card text-red-900"></i>
        <input value={materno} onInput={(ev: any) => setMaterno(ev.target.value)} type="text" placeholder="Apellido Materno" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-envelope text-red-900"></i>
        <input value={correo} onInput={(ev: any) => setCorreo(ev.target.value)} type="email" placeholder="Correo" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
      </div>

      <div className="flex gap-x-2 items-center mx-auto my-2">
        <i className="fa-solid fa-phone text-red-900"></i>
        <input value={telefono} onInput={(ev: any) => setTelefono(ev.target.value)} type="tel" placeholder="Teléfono" className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"/>
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
