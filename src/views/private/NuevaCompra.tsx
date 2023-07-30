import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";

const NuevaCompra = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(false);
  const [verDetalles, setVerDetalles] = useState(false);

  const [listadoProveedores, setListadoProveedores] = useState<any>([]);
  const [listadoProductos, setListadoProductos] = useState<any>([]);

  const [productos, setProductos] = useState<any>([]);

  const [proveedor, setProveedor] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precioUnitario, setPrecioUnitario] = useState(0);

  useEffect(() => {
    async function fetchProveedores() {
      try {
        const respuesta = await axios.get(API_URL + "/proveedores/listado");

        setListadoProveedores(respuesta.data["data"]);
        setProveedor(respuesta.data["data"][0]._id);
      } catch (error: any) {
        console.log(error);
        alert(error.response.data.msg);
      }
    }
    async function fetchProductos() {
      try {
        const respuesta = await axios.get(API_URL + "/productos/listado");

        setListadoProductos(respuesta.data["data"]);
        setProducto(respuesta.data["data"][0]._id);
      } catch (error: any) {
        console.log(error);
        alert(error.response.data.msg);
      }
    }

    async function cargarListas() {
      setCargando(true);
      try {
        await Promise.all([fetchProductos(), fetchProveedores()]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    }

    cargarListas();
  }, []);

  function agregarProducto() {

    if (!proveedor.length) {
      alert('Elija un proveedor');
    } else if (!producto.length) {
      alert('Elija un producto');
    } else {
      const _producto = listadoProductos.filter((p: any) => p._id == producto)[0];
      const _proveedor = listadoProveedores.filter((p: any) => p._id == proveedor)[0];
  
      setProductos((lista: any) => [
        ...lista,
        {
          producto: _producto,
          proveedor: _proveedor,
          cantidad,
          precioUnitario,
        },
      ]);
      alert("Producto agregado");
      limpiarStates();
    }
  }

  function removerProducto(index: any) {
    setProductos((lista: any) =>
      lista.filter((p: any, i: any) => i != index)
    );
    alert("Producto removido");
    limpiarStates();
  }

  function limpiarStates() {
    setProveedor(listadoProveedores[0]._id);
    setProducto(listadoProductos[0]._id);
    setPrecioUnitario(0);
    setCantidad(0);
  }

  async function RealizarCompra() {
    if (!productos.length) {
      alert('No hay productos para comprar');
    } else {

      const confirmado = confirm('¿Desea realizar la compra?');

      if (confirmado) {
        try {
          const respuesta = await axios.post(API_URL + "/compras/nueva", {
           datosCompra: productos 
          });
  
          alert(respuesta.data['msg']);
          setProductos([]);
          navigate('/compras');
        } catch (error: any) {
          console.log(error);
          alert(error.response.data.msg);
        }
      }
    }
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center mt-2 font-bold">Nueva Compra</h1>
      <button
        onClick={() => {
          navigate("/compras");
        }}
        className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 py-4 px-4 text-2xl text-white font-normal"
      >
        Regresar
      </button>

      {cargando ? (
        <Esperando />
      ) : (
        <div className="flex flex-col items-center gap-y-8">
          <section>
            <h2 className="font-bold text-center text-xl mb-4">
              Elegir proveedor
            </h2>

            <select
              value={proveedor}
              onChange={(ev) => {
                setProveedor(ev.target.value);
              }}
              className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            >
              {listadoProveedores.map((proveedor: any, index: any) => (
                <option key={index} value={proveedor._id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h2 className="font-bold text-center text-xl mb-4">
              Elegir productos
            </h2>

            <select
              value={producto}
              onChange={(ev) => {
                setProducto(ev.target.value);
              }}
              className="w-auto border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            >
              {listadoProductos.map((producto: any, index: any) => (
                <option key={index} value={producto._id}>
                  {producto._id}-{producto.categoria.nombre}-{producto.nombre}
                </option>
              ))}
            </select>
          </section>

          <section>
            <h2 className="font-bold text-center text-xl mb-4">
              Detalles del producto a comprar
            </h2>

            {producto.length ? (
              <img
                src={
                  listadoProductos.filter((p: any) => p._id === producto)[0]
                    .imagenUrl
                }
                alt=""
                className="mx-auto object-contain w-32 h-32"
              />
            ) : (
              <></>
            )}

            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex justify-between">
                <label htmlFor="">Precio Unitario</label>
                <input
                  value={precioUnitario}
                  onInput={(ev: any) => setPrecioUnitario(ev.target.value)}
                  type="numeric"
                  placeholder="Ejemplo: 100.0"
                  className="border-b-2 border-red-700 px-2 text-center"
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="">Cantidad</label>
                <input
                  value={cantidad}
                  onInput={(ev: any) => setCantidad(ev.target.value)}
                  type="numeric"
                  placeholder="Ejemplo: 0"
                  className="border-b-2 border-red-700 px-2 text-center"
                />
              </div>
            </div>
          </section>

          <button
            onClick={(ev) => {
              agregarProducto();
            }}
            className="p-4 text-white bg-blue-400 hover:bg-blue-500"
          >
            Agregar Producto
          </button>

          <button
            onClick={() => {
              setVerDetalles(true);
            }}
            className="p-4 text-white bg-blue-400 hover:bg-blue-500"
          >
            Ver detalles de la compra
          </button>
        </div>
      )}
      {!verDetalles ? (
        <></>
      ) : (
        <div
          id="contenedor"
          className="p-4 min-h-screen absolute top-0 left-0 right-0 bottom-0"
        >
          <h2 className="font-bold text-center text-4xl text-white">
            Detalles
          </h2>
          <div className="w-full overflow-auto mt-10">
            <table className="mx-auto w-full">
              <thead>
                <tr className="text-center bg-amber-800 p-2 text-white">
                  <td className="w-1/7">Proveedor</td>
                  <td className="w-1/7">Nombre</td>
                  <td className="w-1/7">Categoría</td>
                  <td className="w-1/7">Precio Unitario</td>
                  <td className="w-1/7">Cantidad</td>
                  <td className="w-1/7">Importe</td>
                  <td className="w-1/7">Acciones</td>
                </tr>
              </thead>
              <tbody>
                {productos.length > 0 ? (
                  <>
                    {productos.map((info: any, index: any) => {
                      console.log(info);
                      return (
                        <tr
                          className="bg-white text-center overflow-x-scroll"
                          key={index}
                        >
                          <td className="py-4 break-words">{info.proveedor.nombre}</td>
                          <td className="py-4">{info.producto.nombre}</td>
                          <td className="py-4">{info.producto.categoria.nombre}</td>
                          <td className="py-4">${info.precioUnitario}</td>
                          <td className="py-4">{info.cantidad}</td>
                          <td className="py-4">
                            ${info.cantidad * info.precioUnitario}
                          </td>
                          <td className="py-4 flex items-center gap-1 px-1">
                            <button
                              onClick={() => {
                                removerProducto(index);
                              }}
                              className="p-2 bg-red-700 text-white mx-auto w-8"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => {
              setVerDetalles(false);
            }}
            className="block mx-auto my-6 bg-amber-800 hover:bg-amber-900 p-4 text-2xl text-white font-normal"
          >
            Regresar
          </button>
          <button onClick={() => RealizarCompra()} className="p-4 text-white bg-green-600 hover:bg-green-700 mx-auto block w-full text-2xl">
            Terminar Compra
          </button>
        </div>
      )}
    </main>
  );
};

export default NuevaCompra;
