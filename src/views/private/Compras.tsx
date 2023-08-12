import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { formatearFecha } from "../../utils/formatos";

const Compras = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);

  const [listadoCompras, setListadoCompras] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const respuesta = await axios.get(API_URL + "/compras/listado");

        setListadoCompras(respuesta.data['data']);
      } catch (error) {
        console.log(error);
        alert('Hubo un error');
      } finally {
        setCargando(false);
      }
    }
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

      {
        cargando ? <Esperando />
        :
        <>
          {
            listadoCompras.length == 0 ? <p className="text-lg text-center">No hay compras realizadas</p>
            :
            <div className="grid grid-cols-3 gap-4 rounded-lg">
              {
                listadoCompras.map((e: any, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white">
                    <p>ID: <span className="text-yellow-600 font-bold">{e._id}</span></p>
                    <p>Fecha: <span>{formatearFecha(e.fecha)} hrs</span></p>
                    <p>Total: $<span className="text-green-700 font-bold">{e.total}</span></p>

                    <Link to={'/compras/'+e._id} className="p-2 text-white bg-yellow-600 hover:bg-yellow-700 block w-full text-center">Ver</Link>

                  </div>
                ))
              }
            </div>
          }
        </>
      }
    </main>
  );
};

export default Compras;
