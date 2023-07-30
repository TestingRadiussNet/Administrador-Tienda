import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import ModalEditarCategoria from "../../components/ModalEditarCategoria";

const Categorias = () => {
    const navigate = useNavigate();

    const [cargando, setCargando] = useState(false);
    const [listadoCategorias, setListadoCategorias] = useState([]);

    const [editar, setEditar] = useState(false);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setCargando(true);
        try {
            const respuesta = await axios.get(API_URL+"/categorias/listado");
            setListadoCategorias(respuesta.data['data']);
        } catch (error) {
            console.log(error);
            alert('Hubo un error');
        } finally { 
            setCargando(false);
        }
    }

    async function eliminar(categoria: any) {
        const confirmado = confirm("¿Desea eliminarlo?");
    
        if (confirmado) {
          try {
            const respuesta = await axios.delete(
              API_URL + "/categorias/eliminar/" + categoria._id
            );
    
            alert(respuesta.data["msg"]);
            fetchData();
          } catch (error: any) {
            console.log(error);
            alert(error.response.data['msg']);
          } finally {
          }
        }
    }

    function edicion(categoria: any) {
        setId(categoria._id);
        setNombre(categoria.nombre);

        setEditar(true);
    }

    function limpiarStates() {
        setId("");
        setNombre("");
    }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Categorías</h1>

      <button
        onClick={() => {
          navigate("/categorias/nuevo");
        }}
        className="block mx-auto my-6 bg-green-600 hover:bg-green-700 py-4 px-4 text-2xl text-white font-normal"
      >
        Nuevo
      </button>

      {cargando ? (
        <Esperando />
      ) : !listadoCategorias.length ? (
        <p className="text-2xl text-center text-white mt-10">
          Sin categorías.
        </p>
      ) : (
        <div className="w-full overflow-auto">
          <table className="mx-auto">
            <thead>
              <tr className="text-center bg-amber-800 p-2 text-white">
                <td className="w-1/4">Nombre</td>
                <td className="w-1/4">Acciones</td>
              </tr>
            </thead>
            <tbody>
              {listadoCategorias.map((categoria: any, index) => (
                <tr
                  className="bg-white text-center overflow-x-scroll"
                  key={index}
                >
                  <td className="py-4">{categoria.nombre}</td>
                  <td className="py-4 flex items-center gap-1 px-1">
                    {categoria.nombre == "Otros" || categoria.nombre === "Sin categoria" ? (
                      <p className="text-center mx-auto text-gray-500">Sin acciones</p>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            eliminar(categoria);
                          }}
                          className="w-1/2 p-2 bg-red-700 text-white"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => {
                            edicion(categoria);
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
        <ModalEditarCategoria
          id={id}
          nombre={nombre}
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
}

export default Categorias