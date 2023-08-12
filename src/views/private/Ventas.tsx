import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { formatearFecha } from "../../utils/formatos";

const Ventas = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [id, setId] = useState("");
  const [modalEntrega, setModalEntrega] = useState(false);
  const [modalInstalacion, setModalInstalacion] = useState(false);
  const [trabajador, setTrabajador] = useState("");
  const [fecha, setFecha] = useState("");

  const [listadoVentas, setListadoVentas] = useState([]);

  async function fetchData() {
    setCargando(true);
    try {
      const respuesta = await axios.get(API_URL + "/ventas/listado");

      setListadoVentas(respuesta.data["data"]);
    } catch (error) {
      console.log(error);
      alert("Hubo un error");
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function programarEntrega(ev: any) {
    ev.preventDefault();

    if (!fecha.length) {
      alert("Campos faltantes");
    } else {
      setCargando(true);
      try {
        const respuesta = await axios.post(
          API_URL + "/tareas/programar-fecha-entrega/" + id,
          {
            fecha,
          }
        );
        limpiarStates();
        setModalEntrega(false);
        fetchData();
      } catch (error) {
        alert("Hubo un error");
      } finally {
        setCargando(false);
      }
    }
  }

  async function programarInstalacion(ev: any) {
    ev.preventDefault();

    if (!fecha.length || !trabajador.length) {
      alert("Campos faltantes");
    } else {
      setCargando(true);
      try {
        const respuesta = await axios.post(
          API_URL + "/tareas/programar-fecha-instalacion/" + id,
          {
            fecha,
          }
        );
        limpiarStates();
        setModalInstalacion(false);
        fetchData();
      } catch (error) {
        alert("Hubo un error");
      } finally {
        setCargando(false);
      }
    }
  }

  function limpiarStates() {
    setFecha("");
    setId("");
    setTrabajador("");
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Ventas</h1>
      {cargando ? (
        <Esperando />
      ) : (
        <>
          {listadoVentas.length == 0 ? (
            <p className="text-lg text-center">No hay Ventas realizadas</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-lg">
              {listadoVentas.map((e: any, i) => (
                <div key={i} className="p-4 rounded-lg bg-white">
                  <p>
                    ID:{" "}
                    <span className="text-yellow-600 font-bold">{e._id}</span>
                  </p>
                  <p>
                    Fecha: <span>{formatearFecha(e.fecha)} hrs</span>
                  </p>
                  <p>
                    Total: $
                    <span className="text-green-700 font-bold">{e.total}</span>
                  </p>

                  <p className="text-center">
                    {e.entregaPendiente
                      ? "Entrega pendiente"
                      : "Entrega programada"}
                  </p>
                  {e.entregaPendiente ? (
                    <button
                      onClick={() => {
                        setId(e._id);
                        setModalEntrega(true);
                      }}
                      className="block w-full p-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      Programar entrega
                    </button>
                  ) : (
                    <></>
                  )}
                  {e.requiereInstalacion ? (
                    <button
                      onClick={() => {
                        setId(e._id);
                        setModalInstalacion(true);
                      }}
                      className="mt-2.5 block w-full p-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Programar instalación
                    </button>
                  ) : (
                    <></>
                  )}

<Link to={'/ventas/'+e._id} className="p-2 mt-4 text-white bg-green-600 hover:bg-green-700 block w-full text-center">Ver</Link>

                </div>
              ))}
            </div>
          )}
        </>
      )}
      {cargando || !modalInstalacion ? (
        <></>
      ) : (
        <main
          id="contenedor"
          className="mx-auto min-h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center"
        >
          <form
            onSubmit={programarInstalacion}
            className="w-1/2 mx-auto overflow-y-scroll"
          >
            <div className="my-4 mb-8">
              <legend className="font-spacemono text-4xl font-bold">
                Programar Instalacion
              </legend>
            </div>

            <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
              <i className="fa-solid fa-signature text-red-900"></i>
              <input
                value={fecha}
                onInput={(ev: any) => setFecha(ev.target.value)}
                type="date"
                placeholder="Fecha"
                className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
              <i className="fa-solid fa-signature text-red-900"></i>
              <input
                value={trabajador}
                onInput={(ev: any) => setTrabajador(ev.target.value)}
                type="text"
                placeholder="Nombre del trabajador"
                className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <br className="mt-10" />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal"
            >
              Programar Instalacion
            </button>

            <button
              onClick={() => {
                limpiarStates();
                setModalInstalacion(false);
              }}
              type="button"
              className="mt-2 bg-yellow-600 hover:bg-yellow-700 py-4 text-2xl text-white font-normal"
            >
              Regresar
            </button>
          </form>
        </main>
      )}

      {cargando || !modalEntrega ? (
        <></>
      ) : (
        <main
          id="contenedor"
          className="mx-auto min-h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center"
        >
          <form
            onSubmit={programarEntrega}
            className="w-1/2 mx-auto overflow-y-scroll"
          >
            <div className="my-4 mb-8">
              <legend className="font-spacemono text-4xl font-bold">
                Programar Entrega
              </legend>
            </div>

            <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
              <i className="fa-solid fa-signature text-red-900"></i>
              <input
                value={fecha}
                onInput={(ev: any) => setFecha(ev.target.value)}
                type="date"
                placeholder="Fecha"
                className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <br className="mt-10" />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal"
            >
              Programar Entrega
            </button>

            <button
              onClick={() => {
                limpiarStates();
                setModalEntrega(false);
              }}
              type="button"
              className="mt-2 bg-yellow-600 hover:bg-yellow-700 py-4 text-2xl text-white font-normal"
            >
              Regresar
            </button>
          </form>
        </main>
      )}
    </main>
  );
};

export default Ventas;
