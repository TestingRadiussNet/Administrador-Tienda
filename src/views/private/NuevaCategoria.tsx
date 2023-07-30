import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { useNavigate } from "react-router-dom";

const NuevaCategoria = () => {

  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);

  const [nombre, setNombre] = useState("");

  async function CrearCategoria(ev: any) {
    ev.preventDefault();

    if (!nombre.length) {
      alert("Falta nombre");
    } else {
      try {
        const respuesta = await axios.post(API_URL + "/categorias/nuevo", {
          nombre,
        });

        alert(respuesta.data["msg"]);
        navigate("/categorias");
      } catch (error: any) {
        console.log(error);
        alert(error.response.data.msg);
      } finally {
        setCargando(false);
      }
    }
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Nueva Categoría</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/categorias");
            }}
            className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 py-4 px-4 text-2xl text-white font-normal"
          >
            Regresar
          </button>

          <form onSubmit={CrearCategoria} className="w-1/2 mx-auto">
            <div className="my-4 mb-8">
              <legend className="font-spacemono text-4xl font-bold">
                Crear
              </legend>
            </div>

            <div className="flex gap-x-2 items-center mx-auto my-2">
              <i className="fa-solid fa-signature text-red-900"></i>
              <input
                value={nombre}
                onInput={(ev: any) => setNombre(ev.target.value)}
                type="text"
                placeholder="Nombre"
                className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <br className="mt-10" />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal"
            >
              Crear
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default NuevaCategoria;
