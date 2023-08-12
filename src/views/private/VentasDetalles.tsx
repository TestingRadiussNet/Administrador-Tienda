import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";

const VentasDetalles = () => {
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const respuesta = await axios.get(
          API_URL + "/ventas/detalles/" + id
        );

        setDetalles(respuesta.data["data"]);
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
