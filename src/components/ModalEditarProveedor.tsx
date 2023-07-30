import { useState } from "react";
import { EmailValido } from "../functions/validaciones";
import axios from "axios";
import { API_URL } from "../global/api";

const ModalEditarProveedor = ({
  id,
  nombre,
  correo,
  telefono,
  setEditar,
  callback,
}: any) => {
  const [_id, setId] = useState(id);
  const [_nombre, setNombre] = useState(nombre);
  const [_correo, setCorreo] = useState(correo);
  const [_telefono, setTelefono] = useState(telefono);

  async function EditarProveedor(ev: any) {
    ev.preventDefault();

    if (!_nombre.length) {
      alert("Falta nombre");
    } else if (!_correo.length) {
      alert("Falta correo");
    } else if (!EmailValido(_correo)) {
      alert("Correo inválido");
    } else if (!_telefono.length) {
      alert("Falta teléfono");
    } else {
      try {
        const respuesta = await axios.patch(
          API_URL + "/proveedores/editar/" + _id,
          {
            nombre: _nombre,
            correo: _correo,
            telefono: _telefono,
          }
        );

        alert(respuesta.data["msg"]);
        
        callback();
      } catch (error: any) {
        console.log(error);
        alert(error.response.data.msg);
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
      <form onSubmit={EditarProveedor} className="w-1/2 mx-auto">
        <div className="my-4 mb-8">
          <legend className="font-spacemono text-4xl font-bold">Editar</legend>
        </div>

        <div className="flex gap-x-2 items-center mx-auto my-2">
          <i className="fa-solid fa-user text-red-900"></i>
          <input
            value={_nombre}
            onInput={(ev: any) => setNombre(ev.target.value)}
            type="text"
            placeholder="Nombre"
            className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
          />
        </div>
        <div className="flex gap-x-2 items-center mx-auto my-2">
          <i className="fa-solid fa-envelope text-red-900"></i>
          <input
            value={_correo}
            onInput={(ev: any) => setCorreo(ev.target.value)}
            type="email"
            placeholder="Correo"
            className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
          />
        </div>
        <div className="flex gap-x-2 items-center mx-auto my-2">
          <i className="fa-solid fa-phone text-red-900"></i>
          <input
            value={_telefono}
            onInput={(ev: any) => setTelefono(ev.target.value)}
            type="tel"
            placeholder="Teléfono"
            maxLength={10}
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

export default ModalEditarProveedor;
