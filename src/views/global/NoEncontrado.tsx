import { Link } from "react-router-dom"

import "./NoEncontrado.css";

const NoEncontrado = () => {
  return (
    <div id="contenedor" className="min-h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
      <span className="text-4xl font-bold text-white font-spacemono">No encontrado</span>
      <Link to={'/login'} className="text-2xl mt-10 text-white font-cursive">Regresar</Link>
    </div>
  )
}

export default NoEncontrado