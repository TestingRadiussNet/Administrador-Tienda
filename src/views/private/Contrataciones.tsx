import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { formatearFecha } from "../../utils/formatos";

const Contrataciones = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [id, setId] = useState("");
  const [modalInstalacion, setModalInstalacion] = useState(false);
  const [fecha, setFecha] = useState("");
  const [trabajador, setTrabajador] = useState("");

  const [listadoContrataciones, setListadoContrataciones] = useState([]);

  async function fetchData() {
    setCargando(true);
    try {
      const respuesta = await axios.get(API_URL + "/contrataciones/listado");
      console.log(respuesta.data['data']);
      setListadoContrataciones(respuesta.data['data']);
    } catch (error) {
      console.log(error);
      alert('Hubo un error');
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function programarInstalacion(ev: any) {
    ev.preventDefault();

    if (!trabajador.length || !fecha.length) {
      alert("Faltan campos");
    } else {
      setCargando(true);
      try {
        const respuesta = await axios.put(API_URL+"/contrataciones/programar-instalacion/"+id, {
          fecha,
          trabajador
        });
        alert(respuesta.data["msg"]);
        limpiarStates();
        fetchData();
        setModalInstalacion(false);
      } catch (error: any) {
        alert(error.response.data);
      } finally {
        setCargando(false);
      }
    }
  }

  function limpiarStates() {
    setId("");
    setTrabajador("");
    setFecha("");
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Contrataciones</h1>

      {
        cargando ? <Esperando />
        :
        <>
          {
            listadoContrataciones.length == 0 ? <p className="text-lg text-center">No hay contrataciones realizadas</p>
            :
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-lg">
              {
                listadoContrataciones.map((e: any, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white">
                    <p>ID: <span className="text-yellow-600 font-bold">{e._id}</span></p>
                    <p>Cliente: <span className="">{e.usuario.nombre} {e.usuario.paterno} (<span className="text-yellow-600 font-bold">{e.usuario.telefono}</span>) (<span className="text-yellow-600 font-bold">{e.usuario.correo}</span>)</span></p>
                    <p>Fecha: <span>{formatearFecha(e.fecha)} hrs</span></p>
                    <p>Servicio: <span className="text-blue-700 font-bold">{e.servicio.nombre}</span></p>
                    <p>Precio mensual: $<span className="text-green-600">{e.precioMensual}</span></p>
                    <p>
                    Meses contratados:{" "}
                    <span className="">{e.mesesContratados}</span>
                  </p>
                    <p>Total: $<span className="text-green-700 font-bold">{e.total}</span></p>
                    <p>Estado: <span>{e.instalacionPendiente ? "Instalación pendiente" : "Instalación programada"}</span></p>

                    {
                      !e.instalacionPendiente ? <></>
                      :
                      <button 
                      onClick={() => {
                        setId(e._id);
                        setModalInstalacion(true);
                      }}
                      className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white w-full mt-2">
                      Programar Instalación
                    </button>
                    }
                  </div>
                ))
              }
            </div>
          }


        </>
      }

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
              Programar entrega
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
    </main>
  );
};

export default Contrataciones;
