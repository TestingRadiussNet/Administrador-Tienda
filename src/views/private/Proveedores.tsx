import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { useNavigate } from "react-router-dom";
import ModalEditarProveedor from "../../components/ModalEditarProveedor";

const Provedoores = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [listadoProveedores, setListadoProveedores] = useState([]);

  const [editar, setEditar] = useState(false);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setCargando(true);
    try {
      const respuesta = await axios.get(API_URL + "/proveedores/listado");
      setListadoProveedores(respuesta.data["data"]);
    } catch (error) {
      console.log(error);
      alert("Hubo un error");
    } finally {
      setCargando(false);
    }
  }

  async function eliminar(proveedor: any) {
    const confirmado = confirm("¿Desea eliminarlo?");

    if (confirmado) {
      try {
        const respuesta = await axios.delete(
          API_URL + "/proveedores/eliminar/" + proveedor._id
        );

        alert(respuesta.data["msg"]);
        fetchData();
      } catch (error) {
        console.log(error);
        alert("Hubo un error");
      } finally {
      }
    }
  }

  function edicion(proveedor: any) {
    setId(proveedor._id);
    setNombre(proveedor.nombre);
    setCorreo(proveedor.correo);
    setTelefono(proveedor.telefono);

    setEditar(true);
  }

  function limpiarStates() {
    setId("");
    setNombre("");
    setCorreo("");
    setTelefono("");
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Proveedores</h1>

      <button
        onClick={() => {
          navigate("/proveedores/nuevo");
        }}
        className="block mx-auto my-6 bg-green-600 hover:bg-green-700 py-4 px-4 text-2xl text-white font-normal"
      >
        Nuevo
      </button>

      {cargando ? (
        <Esperando />
      ) : !listadoProveedores.length ? (
        <p className="text-2xl text-center text-white mt-10">
          Sin proveedores.
        </p>
      ) : (
        <div className="w-full overflow-auto">
          <table className="mx-auto">
            <thead>
              <tr className="text-center bg-amber-800 p-2 text-white">
                <td className="w-1/4">Nombre</td>
                <td className="w-1/4">Correo</td>
                <td className="w-1/4">Teléfono</td>
                <td className="w-1/4">Acciones</td>
              </tr>
            </thead>
            <tbody>
              {listadoProveedores.map((proveedor: any, index) => (
                <tr
                  className="bg-white text-center overflow-x-scroll"
                  key={index}
                >
                  <td className="py-4">{proveedor.nombre}</td>
                  <td className="py-4">{proveedor.correo}</td>
                  <td className="py-4">{proveedor.telefono}</td>
                  <td className="py-4 flex items-center gap-1 px-1">
                    {proveedor.nombre == "Sin proveedor" ? (
                      <p className="text-center mx-auto text-gray-500">Sin acciones</p>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            eliminar(proveedor);
                          }}
                          className="w-1/2 p-2 bg-red-700 text-white"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => {
                            edicion(proveedor);
                          }}
                          className="w-1/2 p-2 bg-sky-600 text-white"
                        >
                          Editar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editar ? (
        <ModalEditarProveedor
          id={id}
          nombre={nombre}
          correo={correo}
          telefono={telefono}
          setEditar={setEditar}
          callback={() => {
            fetchData();
            limpiarStates();
            setEditar(false);
          }}
        />
      ) : (
        <></>
      )}
    </main>
  );
};

export default Provedoores;
