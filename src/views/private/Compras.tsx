import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Compras = () => {
  const navigate = useNavigate();

  const [listadoCompras, setListadoCompras] = useState([]);

  useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Compras</h1>
      <button
        onClick={() => {
          navigate("/compras/nueva");
        }}
        className="block mx-auto my-6 bg-green-600 hover:bg-green-700 py-4 px-4 text-2xl text-white font-normal"
      >
        Nuevo
      </button>
    </main>
  );
};

export default Compras;
