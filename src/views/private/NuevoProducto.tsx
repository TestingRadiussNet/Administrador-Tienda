import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as filestack from "filestack-js";

import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";

const NuevoProducto = () => {
  const FILESTACK_API_KEY = "A7FjM5BMSLeqEKYUxEdaCz";
  const fsClient = filestack.init(FILESTACK_API_KEY);

  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  const [listadoCategorias, setListadoCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioVenta, setPrecioVenta] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [imagenUrl, setImagenUrl] = useState("");
  const [imagenHandle, setImagenHandle] = useState("");

  useEffect(() => {
    async function fetchCategorias() {
      setCargando(true);
      try {
        const respuesta = await axios.get(API_URL + "/categorias/listado");

        setListadoCategorias(respuesta.data["data"]);
        setCategoria(
          respuesta.data["data"].filter(
            (cat: any) => cat.nombre === "Sin categoria"
          )[0]._id
        );
      } catch (error: any) {
        alert(error.response.data["msg"]);
      } finally {
        setCargando(false);
      }
    }
    fetchCategorias();
  }, []);

  async function Crear(ev: any) {
    ev.preventDefault();

    if (!nombre.length) {
      alert("Falta nombre");
    } else if (!descripcion.length) {
      alert("Falta descripción");
    } else if (!categoria.length) {
      alert("Falta categoría");
    } else if (precioVenta < 0) {
        alert('Precio de venta menor a 0')
    } else if (disponible < 0) {
        alert('Disponibilidad menor a 0')
    } else if (!imagenHandle.length || !imagenHandle.length) {
        alert('Ingrese una imágen')
    } else {
      try {
        const respuesta = await axios.post(API_URL + "/productos/nuevo", {
          nombre,
          descripcion,
          categoria,
          precioVenta,
          disponible,
          imagenHandle,
          imagenUrl
        });

        alert(respuesta.data["msg"]);
        navigate("/productos");
      } catch (error: any) {
        console.log(error);
        alert(error.response.data.msg);
      }
    }
  }

  function handleSubidaImagen() {
    fsClient
      .picker({
        maxFiles: 1,
        accept: ["image/*"],
        onFileUploadFinished: async (file) => {
          console.log(file);

          if (imagenHandle) {
            borrarImagenAnterior(imagenHandle);
          }

          setImagenUrl(file.url);
          setImagenHandle(file.handle);
        },
        onCancel: (file) => {
          console.log('Cancelada');
          console.log(file);
        }
      })
      .open();
  }

  async function borrarImagenAnterior(handle: string) {
    const policy = "eyJleHBpcnkiOjE3MDQwODcwMDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiLCJydW5Xb3JrZmxvdyJdfQ==";
    const signature = "42e1a52c4b8b2a08e4c4257357bb93faa82308b9b51d01895cf3cb0a592aacae";
    
    // const policy = {
    //   expiry: 1704087000, //Fin de año a las 11:30 pm
    //   call: ['pick', 'read', 'store', 'convert', 'remove'],
    //   handle: 'allow',
    //   mimetype: 'image/*',
    // };

    try {
      fsClient.remove(handle, {
        policy,
        signature,
      }).then(respuesta => {
        console.log('Eliminado imagen con handle '+handle);
        console.log(respuesta);
      });      
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Nuevo Producto</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/productos");
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

            <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
              <i className="fa-solid fa-signature text-red-900"></i>
              <input
                value={nombre}
                onInput={(ev: any) => setNombre(ev.target.value)}
                type="text"
                placeholder="Nombre"
                className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
              <i className="fa-solid fa-address-card text-red-900"></i>
              <textarea
                value={descripcion}
                onInput={(ev: any) => setDescripcion(ev.target.value)}
                placeholder="Descripción del producto"
                className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
              <i className="fa-solid fa-address-card text-red-900"></i>
              <select
                name=""
                id=""
                value={categoria}
                onChange={(ev) => setCategoria(ev.target.value)}
                className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              >
                {listadoCategorias.map((cat: any, index) => (
                  <option value={cat._id} key={index} selected={index == 0}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="gap-x-2 items-center my-2 w-full">
              <p>Precio compra</p>
              <input
                value={precioCompra}
                onInput={(ev: any) => setPrecioCompra(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 250.0"
                className="w-full text-center flex-grow border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div> */}

            <div className="gap-x-2 items-center my-2 w-full">
              {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
              <p>Precio venta</p>
              <input
                value={precioVenta}
                onInput={(ev: any) => setPrecioVenta(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 275.0"
                className="w-full text-center border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            <div className="gap-x-2 items-center my-2 w-full">
              {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
              <p>Stock disponible</p>
              <input
                value={disponible}
                onInput={(ev: any) => setDisponible(ev.target.value)}
                type="number"
                min={0}
                placeholder="Ejemplo: 12"
                className="w-full text-center border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
              />
            </div>

            {/* SUBIDA DE IMÁGENES */}
            <button
              onClick={handleSubidaImagen}
              type="button"
              className="my-4 p-4 bg-green-500 hover:bg-green-600 text-white"
            >
              Subir Imágen
            </button>

            <div className="my-4">
              <img src={imagenUrl} alt="Producto" />
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

export default NuevoProducto;
