import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import ModalEditarProducto from "../../components/ModalEditarProducto";

const Productos = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [listadoProductos, setListadoProductos] = useState([]);

  const [editar, setEditar] = useState(false);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioVenta, setPrecioVenta] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [imagenUrl, setImagenUrl] = useState("");
  const [imagenHandle, setImagenHandle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setCargando(true);
    try {
      const respuesta = await axios.get(API_URL + "/productos/listado");
      setListadoProductos(respuesta.data["data"]);
    } catch (error) {
      console.log(error);
      alert("Hubo un error");
    } finally {
      setCargando(false);
    }
  }

  async function inhabilitar(producto: any) {
    const confirmado = confirm("Desea inhabilitarlo?");

    if (confirmado) {
      try {
        const respuesta = await axios.delete(API_URL+"/productos/inhabilitar/"+producto._id);

        alert(respuesta.data["msg"]);
        fetchData();
      } catch (error) {
        console.log(error);
        alert('Hubo un error');
      }
    }
  }

  async function habilitar(producto: any) {
    const confirmado = confirm("Desea habilitarlo?");

    if (confirmado) {
      try {
        const respuesta = await axios.put(API_URL+"/productos/habilitar/"+producto._id);

        alert(respuesta.data["msg"]);
        fetchData();
      } catch (error) {
        console.log(error);
        alert('Hubo un error');
      }
    }
  }

  function edicion(producto: any) {
    setId(producto._id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setCategoria(producto.categoria);
    setPrecioVenta(producto.precioVenta);
    setDisponible(producto.disponible);
    setImagenHandle(producto.imagenHandle);
    setImagenUrl(producto.imagenUrl);

    setEditar(true);
  }

  function limpiarStates() {
    setId("");
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setPrecioVenta(0);
    setDisponible(0);
    setImagenHandle("");
    setImagenUrl("");
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Productos</h1>
      <button
        onClick={() => {
          navigate("/productos/nuevo");
        }}
        className="block mx-auto my-6 bg-green-600 hover:bg-green-700 py-4 px-4 text-2xl text-white font-normal"
      >
        Nuevo
      </button>

      {cargando ? (
        <Esperando />
      ) : !listadoProductos.length ? (
        <p className="text-2xl text-center text-white mt-10">Sin productos.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {listadoProductos.map((producto: any, index) => (
            <div
              className="p-2 bg-white rounded-lg flex flex-col items-center justify-between"
              key={index}
            >
              {producto.activo ? <p className="text-green-600">Habilitado</p> : <p className="text-red-600">Inhabilitado</p>}
              <img
                className="object-contain w-64 h-64"
                src={producto.imagenUrl}
                alt={producto.nombre}
              />

              <div className="">
                <p className="font-bold">{producto.nombre}</p>
                <p>
                  Precio:{" "}
                  <span className="text-green-700">
                    ${producto.precioVenta}
                  </span>
                </p>
                <p>
                  Disponible{" "}
                  <span className="text-green-700">{producto.disponible}</span>
                </p>
              </div>
              <div className="mt-5 flex gap-x-2 w-full">
              {
                producto.activo ?
                <button
                onClick={() => {
                  inhabilitar(producto);
                }}
                className="w-1/2 p-2 bg-red-700 text-white"
              >
                Inhabilitar
              </button>
              :
              <button
              onClick={() => {
                habilitar(producto);
              }}
              className="w-1/2 p-2 bg-green-600 text-white"
            >
              Habilitar
            </button>
            }
                <button onClick={() => {
                  edicion(producto);
                }} className="w-1/2 p-2 bg-sky-600 text-white">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editar ? (
        <ModalEditarProducto
          id={id}
          nombre={nombre}
          descripcion={descripcion}
          categoria={categoria}
          precioVenta={precioVenta}
          disponible={disponible}
          imagenHandle={imagenHandle}
          imagenUrl={imagenUrl}
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

export default Productos;
