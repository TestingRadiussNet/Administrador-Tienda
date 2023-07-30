import { useState } from "react";
import axios from "axios";
import { API_URL } from "../global/api";

const ModalEditarServicioInternet = ({
  id,
  nombre,
  gb,
  velocidadDescargaMbps,
  dispositivosSimultaneos,
  precioMensual,
  setEditar,
  callback,
}: any) => {
    const [_id, setId] = useState(id);
    const [_nombre, setNombre] = useState(nombre);
    const [_gb, setGb] = useState(gb);
    const [_velocidadDescargaMbps, setVelocidadDescargaMbps] = useState(velocidadDescargaMbps);
    const [_dispositivosSimultaneos, setDispositivosSimultaneos] = useState(dispositivosSimultaneos);
    const [_precioMensual, setPrecioMensual] = useState(precioMensual);

  async function EditarServicio(ev: any) {
    ev.preventDefault();

    if (!_nombre.length) {
        alert("Falta nombre");
      } else if (_gb < 0) {
        alert('Los GBs son menores a 0');
      } else if (_velocidadDescargaMbps < 0) {
        alert('La velocidad de descarga en Mbps es menor a 0');
      } else if (_dispositivosSimultaneos < 0) {
        alert('Los dispositivos simultáneos son menores a 0');
      } else if (_precioMensual < 0) {
        alert('El precio mensual es menor a 0');
      } else {
      try {
        const respuesta = await axios.patch(API_URL + "/internet/editar/"+_id, {
            nombre: _nombre,
            gb: _gb,
            velocidadDescargaMbps: _velocidadDescargaMbps,
            dispositivosSimultaneos: _dispositivosSimultaneos,
            precioMensual: _precioMensual,
          });

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
      <form onSubmit={EditarServicio} className="w-1/2 mx-auto">
        <div className="my-4 mb-8">
          <legend className="font-spacemono text-4xl font-bold">Editar</legend>
        </div>

        <div className="my-4 mb-8">
              <legend className="font-spacemono text-4xl font-bold">
                Crear
              </legend>
            </div>

            <div className="flex gap-x-2 items-center mx-auto my-2">
              <i className="fa-solid fa-signature text-red-900"></i>
              <input
                value={_nombre}
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
                value={_gb}
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
                value={_velocidadDescargaMbps}
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
                value={_dispositivosSimultaneos}
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
                value={_precioMensual}
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
)}
export default ModalEditarServicioInternet;
