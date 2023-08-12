import { useState } from "react";
import "../../styles/formularios.css";
import { Link, useNavigate } from "react-router-dom";
import { EmailValido } from "../../functions/validaciones";
import axios from "axios";
import { API_URL } from "../../global/api";
import Swal from "sweetalert2";

const Recuperacion = () => {
  const [correo, setCorreo] = useState("");
  const [token, setToken] = useState("");
  const [mostrarInput, setMostrarInput] = useState(false);
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");

  const navigate = useNavigate();

  async function Recuperar(ev: any) {
    ev.preventDefault();

    if (!correo.length) {
      alert("Ingrese un correo");
    } else if (!EmailValido(correo)) {
      alert("Ingrese un correo válido");
    } else {
      //TODO: Lógica
      try {
        const respuesta = await axios.post(
          API_URL + "/admin/recuperar",
          {
            correo,
          }
        );

        alert("Revise su correo");
        Swal.fire({
          title: 'Ingresa el token de recuperación',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Look up',
          showLoaderOnConfirm: true,
          preConfirm: (token) => {
            return axios.get(API_URL+"/admin/recuperar/"+token)
              .then(response => {
                setToken(token);
                setMostrarInput(true);
                return response.data;
              })
              .catch(error => {
                console.log(error);
                Swal.showValidationMessage(error.response.data.msg);
              })
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        })
      } catch (error: any) {
        console.log(error);
        alert(error.response.data["msg"]);
      }
    }
  }

  async function submitNuevaContrasena(ev: any) {
    ev.preventDefault();

    if (!repetirContrasena.length || !contrasena.length) {
      alert("Hay campos vacíos");
      return;
    } else if (contrasena != repetirContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const respuesta = await axios.post(
        API_URL + "/admin/nueva-contrasena/" + token,
        {
          contrasena,
        }
      );

      alert(respuesta.data["msg"]);

      navigate("/login", { replace: true });
    } catch (error: any) {
      console.log(error);
      alert(error.response.data["msg"]);
    }
  }

  return (
    <>
      {!mostrarInput ? (
        <form onSubmit={Recuperar}>
          <h1 className="font-spacemono text-4xl font-medium">RadiussNet</h1>
          <legend className="font-spacemono text-4xl font-bold">
            Recuperar Cuenta
          </legend>

          <div className="flex gap-x-2 items-center mx-auto mt-8">
            <i className="fa-solid fa-envelope text-red-900"></i>
            <input
              value={correo}
              onInput={(ev: any) => setCorreo(ev.target.value)}
              type="email"
              placeholder="Correo"
              className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            />
          </div>

          <div className="link gap-y-2 my-4">
            <Link to={"/login"} className="font-cursive">
              Regresar
            </Link>
          </div>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal"
          >
            Completar
          </button>
        </form>
      ) : (
        <form onSubmit={submitNuevaContrasena}>
          <h1 className="font-spacemono text-4xl font-medium">RadiussNet</h1>
          <legend className="font-spacemono text-4xl font-bold">
            Nueva contraseña
          </legend>

          <div className="flex gap-x-2 items-center mx-auto my-2">
            <i className="fa-solid fa-lock text-red-900"></i>
            <input
              value={contrasena}
              onInput={(ev: any) => setContrasena(ev.target.value)}
              type="password"
              placeholder="Contraseña"
              className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            />
          </div>

          <div className="flex gap-x-2 items-center mx-auto my-2">
            <i className="fa-solid fa-lock text-red-900"></i>
            <input
              value={repetirContrasena}
              onInput={(ev: any) => setRepetirContrasena(ev.target.value)}
              type="password"
              placeholder="Repetir Contraseña"
              className=" border-b-2 border-b-red-700 rounded-sm font-spacemono text-xl"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 py-4 text-2xl text-white font-normal"
          >
            Establecer
          </button>
        </form>
      )}
    </>
  );
};

export default Recuperacion;
