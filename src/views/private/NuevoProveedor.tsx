import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { useNavigate } from "react-router-dom";
import { EmailValido } from "../../functions/validaciones";

const NuevoProveedor = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  async function CrearProveedor(ev: any) {
    ev.preventDefault();

    if (!nombre.length) {
      alert("Falta nombre");
    } else if (!correo.length) {
      alert("Falta correo");
    } else if (!EmailValido(correo)) {
      alert("Correo inválido");
    } else if (!telefono.length) {
      alert("Falta teléfono");
    } else {
      try {
        const respuesta = await axios.post(API_URL + "/proveedores/nuevo", {
          nombre,
          correo,
          telefono,
        });

        alert(respuesta.data["msg"]);
        navigate("/proveedores");
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
      <h1 className="text-4xl text-center mt-2 font-bold">Nuevo Proveedor</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/proveedores");
            }}
            className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 py-4 px-4 text-2xl text-white font-normal"
          >
            Regresar
          </button>

          <form onSubmit={CrearProveedor} className="w-1/2 mx-auto">
            <div className="my-4 mb-8">
              <legend className="font-spacemono text-4xl font-bold">
                Crear
              </legend>
            </div>

            <div className="flex gap-x-2 items-center mx-auto my-2">
              <i className="fa-solid fa-user text-red-900"></i>
              <input
                value={nombre}
                onInput={(ev: any) => setNombre(ev.target.value)}
                type="text"
                placeholder="Nombre"
                className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>
            <div className="flex gap-x-2 items-center mx-auto my-2">
              <i className="fa-solid fa-envelope text-red-900"></i>
              <input
                value={correo}
                onInput={(ev: any) => setCorreo(ev.target.value)}
                type="email"
                placeholder="Correo"
                className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>
            <div className="flex gap-x-2 items-center mx-auto my-2">
              <i className="fa-solid fa-phone text-red-900"></i>
              <input
                value={telefono}
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
              Crear
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default NuevoProveedor;
