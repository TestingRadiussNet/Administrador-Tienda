import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { useNavigate } from "react-router-dom";

const NuevoServicioInternet = () => {

  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);

  const [nombre, setNombre] = useState("");
  const [gb, setGb] = useState(0);
  const [velocidadDescargaMbps, setVelocidadDescargaMbps] = useState(0);
  const [dispositivosSimultaneos, setDispositivosSimultaneos] = useState(0);
  const [precioMensual, setPrecioMensual] = useState(0);

  async function Crear(ev: any) {
    ev.preventDefault();

    if (!nombre.length) {
      alert("Falta nombre");
    } else if (gb < 0) {
      alert('Los GBs son menores a 0');
    } else if (velocidadDescargaMbps < 0) {
      alert('La velocidad de descarga en Mbps es menor a 0');
    } else if (dispositivosSimultaneos < 0) {
      alert('Los dispositivos simultáneos son menores a 0');
    } else if (precioMensual < 0) {
      alert('El precio mensual es menor a 0');
    } else {
      try {
        const respuesta = await axios.post(API_URL + "/internet/nuevo", {
          nombre,
          gb,
          velocidadDescargaMbps,
          dispositivosSimultaneos,
          precioMensual,
        });

        alert(respuesta.data["msg"]);
        navigate("/internet");
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
      <h1 className="text-4xl text-center mt-2 font-bold">Nueva Servicio de Internet</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/internet");
            }}
            className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 py-4 px-4 text-2xl text-white font-normal"
          >
            Regresar
          </button>

          <form onSubmit={Crear} className="w-1/2 mx-auto">
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

            <div className="gap-x-2 items-center my-2 w-full">
              {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
              <p>GB</p>
              <input
                value={gb}
                onInput={(ev: any) => setGb(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 10"
                className="w-full text-center border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="gap-x-2 items-center my-2 w-full">
              {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
              <p>Velocidad de Descarga (Mbps)</p>
              <input
                value={velocidadDescargaMbps}
                onInput={(ev: any) => setVelocidadDescargaMbps(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 50"
                className="w-full text-center border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="gap-x-2 items-center my-2 w-full">
              {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
              <p>Dispositivos Simultáneos</p>
              <input
                value={dispositivosSimultaneos}
                onInput={(ev: any) => setDispositivosSimultaneos(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 4"
                className="w-full text-center border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="gap-x-2 items-center my-2 w-full">
              {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
              <p>Precio Mensual</p>
              <input
                value={precioMensual}
                onInput={(ev: any) => setPrecioMensual(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 275.0"
                className="w-full text-center border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
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

export default NuevoServicioInternet;
