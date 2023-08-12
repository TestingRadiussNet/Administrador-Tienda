import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";

const VentasDetalles = () => {
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const [compraID, setCompraID] = useState("");
  const [detalles, setDetalles] = useState([]);
  const [usuario, setUsuario] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const respuesta = await axios.get(API_URL + "/ventas/detalles/" + id);
        setCompraID(id!.toString());
        setDetalles(respuesta.data["data"]);
        setUsuario(respuesta.data["usuario"]);
      } catch (error) {
        navigate("/ventas");
      } finally {
        setCargando(false);
      }
    }
    fetchData();
  }, []);

  function calcularTotal() {
    let acumulador = 0;
    detalles.forEach((e: any) => {
      acumulador += e.importe;
    });

    return acumulador;
  }

  return cargando ? (
    <Esperando />
  ) : (
    <>
      <button
        onClick={() => {
          navigate("/ventas");
        }}
        className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 py-4 px-4 text-2xl text-white font-normal"
      >
        Regresar
      </button>
      <div className="my-10 container mx-auto">
        <p>
          ID:
          <span className="text-white  font-bold">{compraID}</span>
        </p>
        <p className="text-xl">
          Compra de{" "}
          <span className="font-bold">
            {usuario.nombre} {usuario.paterno} {usuario.materno}
          </span>
        </p>
        <p className="text-xl">
          Teléfono: <span className="font-bold">{usuario.telefono}</span>
        </p>
        <p className="text-xl">
          Correo: <span className="font-bold">{usuario.correo}</span>
        </p>
      </div>
      <div className="mt-10 grid lg:grid-cols-2 gap-4 mx-auto container">
        {detalles.map((e: any, i) => (
          <div
            key={i}
            className="p-4 bg-white flex gap-4 items-center justify-evenly"
          >
            <div>
              <img
                src={e.producto.imagenUrl}
                alt={e.producto.descripcion}
                className="object-contain w-full h-32"
              />
            </div>
            <div>
              <p className="font-bold">{e.producto.nombre}</p>
              <p>
                Precio unitario: <span>${e.precioUnitario}</span>
              </p>
              <p>
                Cantidad: <span>{e.cantidad}</span>
              </p>
              <p>
                Importe: <span>${e.cantidad * e.precioUnitario}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 container mx-auto">
        <p className="text-xl text-center font-semibold">
          Total: $
          <span className="text-white font-bold">{calcularTotal()}</span> MXN
        </p>
      </div>
    </>
  );
};

export default VentasDetalles;
