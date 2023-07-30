import { useState } from "react";
import axios from "axios";
import { API_URL } from "../global/api";

const ModalEditarCategoria = ({
  id,
  nombre,
  setEditar,
  callback,
}: any) => {
  const [_id, setId] = useState(id);
  const [_nombre, setNombre] = useState(nombre);

  async function EditarCategoria(ev: any) {
    ev.preventDefault();

    if (!_nombre.length) {
      alert("Falta nombre");
    } else {
      try {
        const respuesta = await axios.patch(
          API_URL + "/categorias/editar/" + _id,
          {
            nombre: _nombre,
          }
        );

        alert(respuesta.data["msg"]);
        
        callback();
      } catch (error: any) {
        console.log(error);
        alert(error.response);
      } finally {
      }
    }
  }

  function cancelar() {
    setEditar(false);
  }

  return (
    <main
      id="contenedor"
      className="mx-auto min-h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center"
    >
      <form onSubmit={EditarCategoria} className="w-1/2 mx-auto">
        <div className="my-4 mb-8">
          <legend className="font-spacemono text-4xl font-bold">Editar</legend>
        </div>

        <div className="flex gap-x-2 items-center mx-auto my-2">
          <i className="fa-solid fa-card text-red-900"></i>
          <input
            value={_nombre}
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
          Editar
        </button>

        <button
          onClick={() => {
            cancelar();
          }}
          type="button"
          className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 py-4 px-4 text-2xl text-white font-normal"
        >
          Cancelar
        </button>
      </form>
    </main>
  );
};

export default ModalEditarCategoria;
