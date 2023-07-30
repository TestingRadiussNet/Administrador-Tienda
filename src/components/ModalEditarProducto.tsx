import axios from "axios";
import { useEffect, useState } from "react";
import * as filestack from "filestack-js";
import { API_URL } from "../global/api";
import Esperando from "./Esperando/Esperando";

const ModalEditarProducto = ({
  id,
  nombre,
  descripcion,
  categoria,
  precioVenta,
  disponible,
  imagenUrl,
  imagenHandle,
  setEditar,
  callback,
}: any) => {

    const FILESTACK_API_KEY = "A7FjM5BMSLeqEKYUxEdaCz";
    const fsClient = filestack.init(FILESTACK_API_KEY);

  const [cargando, setCargando] = useState(false);
  const [listadoCategorias, setListadoCategorias] = useState([]);

  const [_id, setId] = useState(id);
  const [_nombre, setNombre] = useState(nombre);
  const [_descripcion, setDescripcion] = useState(descripcion);
  const [_categoria, setCategoria] = useState(categoria);
  const [_precioVenta, setPrecioVenta] = useState(precioVenta);
  const [_disponible, setDisponible] = useState(disponible);
  const [_imagenUrl, setImagenUrl] = useState(imagenUrl);
  const [_imagenHandle, setImagenHandle] = useState(imagenHandle);

  useEffect(() => {
    async function fetchCategorias() {
      setCargando(true);
      try {
        const respuesta = await axios.get(API_URL + "/categorias/listado");
        
        setListadoCategorias(respuesta.data["data"]);
        setCategoria(respuesta.data['data'].filter((cat: any) => cat._id == categoria._id)[0]._id);
      } catch (error: any) {
        alert(error.response.data["msg"]);
      } finally {
        setCargando(false);
      }
    }
    fetchCategorias();
  }, []);

  async function Editar(ev: any) {
    ev.preventDefault();

    if (!_nombre.length) {
      alert("Falta nombre");
    } else if (!_descripcion.length) {
      alert("Falta descripción");
    } else if (!_categoria.length) {
      alert("Falta categoría");
    } else if (_precioVenta < 0) {
      alert("Precio de venta menor a 0");
    } else if (_disponible < 0) {
      alert("Disponibilidad menor a 0");
    } else if (!_imagenHandle.length || !imagenHandle.length) {
      alert("Ingrese una imágen");
    } else {
      try {
        const respuesta = await axios.patch(
          API_URL + "/productos/editar/" + id,
          {
            nombre: _nombre,
            descripcion: _descripcion,
            categoria: _categoria,
            precioVenta: _precioVenta,
            disponible: _disponible,
            imagenHandle: _imagenHandle,
            imagenUrl: _imagenUrl,
          }
        );

        alert(respuesta.data["msg"]);
        callback();
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
            accept: ['image/*'],
            onFileUploadFinished: async (file) => {
                console.log(file);
                await axios.patch(API_URL + "/productos/editar/"+id, {
                    imagenHandle: file.handle,
                    imagenUrl: file.url,
                });
                if (_imagenHandle) {
                    await borrarImagenAnterior(_imagenHandle);
                    
                    setImagenHandle(file.handle);
                    setImagenUrl(file.url);

                    alert('Se ha reemplazado la imagen del producto');
                }
            }
        }).open();
  }

  function borrarImagenAnterior(handle: string) {
    return new Promise((resolve, reject) => {
        const policy = "eyJleHBpcnkiOjE3MDQwODcwMDAsImNhbGwiOlsicGljayIsInJlYWQiLCJzdGF0Iiwid3JpdGUiLCJ3cml0ZVVybCIsInN0b3JlIiwiY29udmVydCIsInJlbW92ZSIsImV4aWYiLCJydW5Xb3JrZmxvdyJdfQ==";
        const signature = "42e1a52c4b8b2a08e4c4257357bb93faa82308b9b51d01895cf3cb0a592aacae";
        
        try {
          fsClient.remove(handle, {
            policy,
            signature,
          }).then(respuesta => {
            console.log('Eliminado imagen con handle '+handle);
            console.log(respuesta);
            resolve(respuesta);
          });      
        } catch (error) {
          console.log("Error");
          console.log(error);
          reject();
        }
    
    });
  }

  function cancelar() {
    setEditar(false);
  }

  return(
    <main id="contenedor"
    className="mx-auto min-h-screen absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
    {cargando ? (
      <Esperando />
    ) : (
      <>
        <form onSubmit={Editar} className="w-1/2 mx-auto overflow-y-scroll">
          <div className="my-4 mb-8">
            <legend className="font-spacemono text-4xl font-bold">
              Editar
            </legend>
          </div>

          <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
            <i className="fa-solid fa-signature text-red-900"></i>
            <input
              value={_nombre}
              onInput={(ev: any) => setNombre(ev.target.value)}
              type="text"
              placeholder="Nombre"
              className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            />
          </div>

          <div className="flex gap-x-2 items-center justify-between mx-auto my-2">
            <i className="fa-solid fa-address-card text-red-900"></i>
            <textarea
              value={_descripcion}
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
              value={_categoria}
              onChange={(ev) => setCategoria(ev.target.value)}
              className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            >
              {listadoCategorias.map((cat: any, index) => (
                <option value={cat._id} key={index} selected={cat._id == _id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="gap-x-2 items-center my-2 w-full">
            {/* <i className="fa-solid fa-sock-money text-red-900"></i> */}
            <p>Precio venta</p>
            <input
              value={_precioVenta}
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
              value={_disponible}
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
            <img className="object-contain w-64 h-64 mx-auto" src={_imagenUrl} alt="Producto" />
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
      </>
    )}
  </main>
  );
};

export default ModalEditarProducto;
