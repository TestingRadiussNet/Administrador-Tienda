import { useEffect, useState } from "react";
import Bar from "../../components/charts/Bar";
import Dona from "../../components/charts/Doughnut";
import axios from "axios";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando/Esperando";
import { Chart } from "chart.js";

const Stats = () => {
  const coloresRGB = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(175, 120, 195)",
    "rgb(255, 159, 64)",
    "rgb(153, 102, 255)",
    "rgb(255, 99, 72)",
    "rgb(100, 200, 50)",
    "rgb(0, 150, 255)",
  ];

  const [cargando, setCargando] = useState(true);

  const [gastosVentas, setGastosVentas] = useState<any>({});
  const [gastosVentasGrafica, setGastosVentasGrafica] = useState({});

  const [gastosCategoria, setGastosCategoria] = useState<any>({});
  const [gastosCategoriaGrafica, setGastosCategoriaGrafica] = useState({});

  const [gananciasCategoria, setGananciasCategoria] = useState<any>({});
  const [gananciasCategoriaGrafica, setGananciasCategoriaGrafica] = useState({});

  const [gastosProveedores, setGastosProveedores] = useState<any>({});
  const [gastosProveedoresGrafica, setGastosProveedoresGrafica] = useState({});

  const [serviciosSolicitados, setServiciosSolicitados] = useState<any>({});
  const [serviciosSolicitadosGrafica, setServiciosSolicitadosGrafica] = useState({});

  const [gananciasServicios, setGananciasServicios] = useState<any>({});
  const [gananciasServiciosGrafica, setGananciasServiciosGrafica] = useState({});

  async function obtenerEstadisticas() {
    setCargando(true);
    try {
      await Promise.all([
        gastosVentasStats(),
        gananciasCategoriaStats(),
        gastosCategoriaStats(),
        gastosPoveedoresStats(),
        gananciasServiciosStats(),
        serviciosSolicitadosStats(),
    ]);
    } catch (error) {
      alert("ERROR AL CARGAR LAS ESTADÍSTICAS");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    obtenerEstadisticas();
  }, []);

  async function gastosVentasStats() {
    try {
      const respuesta = await axios.get(API_URL + "/stats/gastos-ganancias");

      setGastosVentas(respuesta.data["data"]);
      setGastosVentasGrafica({
        labels: ["gastos", "ventas"],
        datasets: [
          {
            label: "",
            data: [
              respuesta.data["data"]["compras"],
              respuesta.data["data"]["ventas"],
            ],
            backgroundColor: coloresRGB,
            hoverOffset: 4,
          },
        ],
      });
    } catch (error) {
      alert("Hubo un error");
    }
  }

  async function gastosCategoriaStats() {
    try {
      const respuesta = await axios.get(API_URL + "/stats/gastos-categoria");

      setGastosCategoria(respuesta.data);
      setGastosCategoriaGrafica({
        labels: Object.keys(respuesta.data["data"]).map((k) => k),
        datasets: [
          {
            label: "",
            data: Object.values(respuesta.data["data"]).map((v) => v),
            backgroundColor: coloresRGB,
            hoverOffset: 4,
          },
        ],
      });
    } catch (error) {
      alert("Hubo un error");
    }
  }

  async function gananciasCategoriaStats() {
    try {
      const respuesta = await axios.get(API_URL + "/stats/ganancias-categoria");

      setGananciasCategoria(respuesta.data);
      setGananciasCategoriaGrafica({
        labels: Object.keys(respuesta.data["data"]).map((k) => k),
        datasets: [
          {
            label: "",
            data: Object.values(respuesta.data["data"]).map((v) => v),
            backgroundColor: coloresRGB,
            hoverOffset: 4,
          },
        ],
      });
    } catch (error) {
      alert("Hubo un error");
    }
  }

  async function gastosPoveedoresStats() {
    try {
      const respuesta = await axios.get(API_URL + "/stats/proveedores");

      setGastosProveedores(respuesta.data);
      setGastosProveedoresGrafica({
        labels: Object.keys(respuesta.data["data"]).map((k) => k),
        datasets: [
          {
            label: "",
            data: Object.values(respuesta.data["data"]).map((v) => v),
            backgroundColor: coloresRGB,
            hoverOffset: 4,
          },
        ],
      });
    } catch (error) {
      alert("Hubo un error");
    }
  }

  async function serviciosSolicitadosStats() {
    try {
      const respuesta = await axios.get(API_URL + "/stats/servicios-mas-solicitados");

      setServiciosSolicitados(respuesta.data);
      setServiciosSolicitadosGrafica({
        labels: Object.keys(respuesta.data["data"]).map((k) => k),
        datasets: [
          {
            label: "",
            data: Object.values(respuesta.data["data"]).map((v) => v),
            backgroundColor: coloresRGB,
            hoverOffset: 4,
          },
        ],
      });
    } catch (error) {
      alert("Hubo un error");
    }
  }

  async function gananciasServiciosStats() {
    try {
      const respuesta = await axios.get(API_URL + "/stats/ganancias-servicios");

      setGananciasServicios(respuesta.data);
      setGananciasServiciosGrafica({
        labels: Object.keys(respuesta.data["data"]).map((k) => k),
        datasets: [
          {
            label: "",
            data: Object.values(respuesta.data["data"]).map((v) => v),
            backgroundColor: coloresRGB,
            hoverOffset: 4,
          },
        ],
      });
    } catch (error) {
      alert("Hubo un error");
    }
  }

  Chart.defaults.font.size = 20;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "600",
            size: "20px",
            color: "black",
          },
        },
      },
    },
  };
  return cargando ? (
    <Esperando />
  ) : (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center my-2 mb-8 font-bold">Estadísticas</h1>
      <section className="">
        <h2 className="text-4xl text-center my-2 font-bold">Gastos y Ventas</h2>
        <div className="container mx-auto flex gap-8 justify-center items-center">
          <div className="text-2xl" style={{ width: "300px", height: "300px" }}>
            <Dona data={gastosVentasGrafica} options={options} />
          </div>
          <div className="font-semibold text-xl">
            <p>
              Gastos: $<span>{gastosVentas.compras}</span>
            </p>
            <p>
              Ventas: $<span>{gastosVentas.ventas}</span>
            </p>
          </div>
        </div>

        <h2 className="text-4xl text-center my-2 font-bold">
          {gastosCategoria.msg}
        </h2>
        <div className="container mx-auto flex gap-8 justify-center items-center">
          <div className="text-2xl" style={{ width: "300px", height: "300px" }}>
            <Bar data={gastosCategoriaGrafica} options={options} />
          </div>
        </div>

        <h2 className="text-4xl text-center my-2 font-bold">
          {gananciasCategoria.msg}
        </h2>
        <div className="container mx-auto flex gap-8 justify-center items-center">
          <div className="text-2xl" style={{ width: "300px", height: "300px" }}>
            <Bar data={gananciasCategoriaGrafica} options={options} />
          </div>
        </div>

        <h2 className="text-4xl text-center my-2 font-bold">
          {gastosProveedores.msg}
        </h2>
        <div className="container mx-auto flex gap-8 justify-center items-center">
          <div className="text-2xl" style={{ width: "300px", height: "300px" }}>
            <Bar data={gastosProveedoresGrafica} options={options} />
          </div>
        </div>
        
        <h2 className="text-4xl text-center my-2 font-bold">
          {serviciosSolicitados.msg}
        </h2>
        <div className="container mx-auto flex gap-8 justify-center items-center">
          <div className="text-2xl" style={{ width: "300px", height: "300px" }}>
            <Bar data={serviciosSolicitadosGrafica} options={options} />
          </div>
        </div>

        <h2 className="text-4xl text-center my-2 font-bold">
          {gananciasServicios.msg}
        </h2>
        <div className="container mx-auto flex gap-8 justify-center items-center">
          <div className="text-2xl" style={{ width: "300px", height: "300px" }}>
            <Bar data={gananciasServiciosGrafica} options={options} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Stats;
