import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import ModalEditarServicioInternet from "../../components/ModalEditarServicioInternet";

const ServiciosInternet = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [listadoServicios, setListadoServicios] = useState([]);

  const [editar, setEditar] = useState(false);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [gb, setGb] = useState(0);
  const [velocidadDescargaMbps, setVelocidadDescargaMbps] = useState(0);
  const [dispositivosSimultaneos, setDispositivosSimultaneos] = useState(0);
  const [precioMensual, setPrecioMensual] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setCargando(true);
    try {
      const respuesta = await axios.get(API_URL + "/internet/listado");
      setListadoServicios(respuesta.data["data"]);
    } catch (error) {
      console.log(error);
      alert("Hubo un error");
    } finally {
      setCargando(false);
    }
  }

  async function eliminar(servicio: any) {
    const confirmado = confirm("Desea desactivarlo?");

    if (confirmado) {
      try {
        const respuesta = await axios.delete(
          API_URL + "/internet/desactivar/" + servicio._id
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

  async function activar(servicio: any) {
    const confirmado = confirm("Desea activarlo?");

    if (confirmado) {
      try {
        const respuesta = await axios.patch(
          API_URL + "/internet/activar/" + servicio._id
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

  function edicion(servicio: any) {
    setId(servicio._id);
    setNombre(servicio.nombre);
    setGb(servicio.gb);
    setVelocidadDescargaMbps(servicio.velocidadDescargaMbps);
    setDispositivosSimultaneos(servicio.dispositivosSimultaneos);
    setPrecioMensual(servicio.precioMensual);

    setEditar(true);
  }

  function limpiarStates() {
    setId("");
    setNombre("");
    setGb(0);
    setVelocidadDescargaMbps(0);
    setDispositivosSimultaneos(0);
    setPrecioMensual(0);
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">
        Servicios de Internet
      </h1>
      <button
        onClick={() => {
          navigate("/internet/nuevo");
        }}
        className="block mx-auto my-6 bg-green-600 hover:bg-green-700 py-4 px-4 text-2xl text-white font-normal"
      >
        Nuevo
      </button>

      {cargando ? (
        <Esperando />
      ) : !listadoServicios.length ? (
        <p className="text-2xl text-center text-white mt-10">Sin servicios</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {listadoServicios.map((servicio: any, index) => (
            <div className="p-4 bg-white rounded-lg" key={index}>
              <p className="text-blue-800 font-bold text-center">
                {servicio.nombre} {!servicio.activo ? <span className="block text-red-500">(Desactivado)</span> : <></>}
              </p>
              <div className="flex flex-col gap-y-2">
                <p className="">
                  GBs: <span className="text-green-600">{servicio.gb}</span>
                </p>
                <p className="">
                  Velocidad de descarga:{" "}
                  <span className="text-green-600">
                    {servicio.velocidadDescargaMbps} Mbps
                  </span>
                </p>
                <p className="">
                  Dispositivos simultáneos:{" "}
                  <span className="text-green-600">
                    {servicio.dispositivosSimultaneos}
                  </span>
                </p>
                <p className="">
                  Precio neto mensual:{" "}
                  <span className="text-green-600">
                    ${servicio.precioMensual}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex gap-x-2">
            {
                servicio.activo ?
                <button
                onClick={() => {
                  eliminar(servicio);
                }}
                className="w-1/2 p-2 bg-red-700 text-white"
              >
                Desactivar
              </button>
              :
              <button
              onClick={() => {
                activar(servicio);
              }}
              className="w-1/2 p-2 bg-green-600 text-white"
            >
              Activar
            </button>
            }
                <button
                  onClick={() => {
                    edicion(servicio);
                  }}
                  className="w-1/2 p-2 bg-sky-600 text-white"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editar ? (
        <ModalEditarServicioInternet
          id={id}
          nombre={nombre}
          gb={gb}
          velocidadDescargaMbps={velocidadDescargaMbps}
          dispositivosSimultaneos={dispositivosSimultaneos}
          precioMensual={precioMensual}
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

export default ServiciosInternet;
