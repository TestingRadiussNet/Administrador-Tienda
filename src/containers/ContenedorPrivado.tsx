import { Link, Navigate, Outlet } from "react-router-dom";
import useAutenticacion from "../hooks/autenticacion-hook";
import Esperando from "../components/Esperando/Esperando";

const ContenedorPrivado = () => {
  const {auth, cargando, cerrarSesion} = useAutenticacion();

  if (cargando) return (
    <Esperando />
  );
  if (!auth.data) return <Navigate to={'/login'} replace/>

  function CerrarSesion() {
    const confirmado = confirm('¿Desea cerrar sesión?');

    if (confirmado) {
      cerrarSesion();
    }
  }

  return (
    <div className="bg-yellow-600 min-h-screen flex flex-col flex-wrap font-spacemono">
      <div className="p-8 flex justify-between items-center">
        <div className="font-bold text-4xl flex flex-col items-center justify-center">
          <Link to={'/'} className="hover:text-white">RadiussNet</Link>
          <button onClick={CerrarSesion} className="text-sm text-center hover:text-white">Cerrar Sesión</button>
        </div>
        <nav className=" p-y8 flex list-none gap-x-6 text-xl">
          <Link to={'/productos'} className="hover:text-white font-semibold">Productos</Link>
          <Link to={'/internet'} className="hover:text-white font-semibold">Internet</Link>
          <Link to={'/ventas'} className="hover:text-white font-semibold">Ventas</Link>
          <Link to={'/compras'} className="hover:text-white font-semibold">Compras</Link>
          <Link to={'/contrataciones'} className="hover:text-white font-semibold">Contrataciones</Link>
          <Link to={'/proveedores'} className="hover:text-white font-semibold">Proveedores</Link>
          <Link to={'/categorias'} className="hover:text-white font-semibold">Categorias</Link>
          <Link to={'/estadisticas'} className="hover:text-white font-semibold">Estadísticas</Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default ContenedorPrivado;
