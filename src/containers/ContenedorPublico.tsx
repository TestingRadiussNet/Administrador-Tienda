import { Navigate, Outlet } from "react-router-dom";

import "./ContenedorPublico.css";
import useAutenticacion from "../hooks/autenticacion-hook";
import Esperando from "../components/Esperando/Esperando";

const ContenedorPublico = () => {
  const { auth, cargando } = useAutenticacion();

  if (cargando)
    return (
      <Esperando />
    );

  if (auth.data) return <Navigate to={"/"} replace />;
  
  return (
    <main
      id="contenedor-animado"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Outlet />
    </main>
  );
};

export default ContenedorPublico;
