import { useState } from "react";
import "../../styles/formularios.css";
import { Link } from "react-router-dom";
import { EmailValido } from "../../functions/validaciones";

const Recuperacion = () => {
  const [correo, setCorreo] = useState("");

  async function Recuperar(ev: any) {
    ev.preventDefault();

    if (!correo.length) {
      alert('Ingrese un correo');
    } else if (!EmailValido(correo)) {
      alert('Ingrese un correo válido');
    } else {

      //TODO: Lógica

    }
  }

  return (
    <form onSubmit={Recuperar}>
      <h1 className="font-spacemono text-4xl font-medium">RadiussNet</h1>
      <legend className="font-spacemono text-4xl font-bold">
        Recuperar Cuenta
      </legend>

      <div className="flex gap-x-2 items-center mx-auto mt-8">
        <i className="fa-solid fa-envelope text-red-900"></i>
        <input
          value={correo}
          onInput={(ev: any) => setCorreo(ev.target.value)}
          type="email"
          placeholder="Correo"
          className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
        />
      </div>

      <div className="link gap-y-2 my-4">
        <Link to={'/login'} className="font-cursive">Regresar</Link>
      </div>

      <button type="submit" className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal">Completar</button>
    </form>
  );
};

export default Recuperacion;
