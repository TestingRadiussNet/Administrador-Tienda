import { HashRouter, Router, Route, Routes } from "react-router-dom";
import ContenedorPublico from "./containers/ContenedorPublico";
import Inicio from "./views/private/Inicio";
import Login from "./views/public/Login";
import ContenedorPrivado from "./containers/ContenedorPrivado";
import { AutenticacionProvider } from "./contexts/AutenticacionContext";
import Recuperacion from "./views/public/Recuperacion";
import CrearCuenta from "./views/public/CrearCuenta";
import NoEncontrado from "./views/global/NoEncontrado";
import Productos from "./views/private/Productos";
import Provedoores from "./views/private/Proveedores";
import NuevoProveedor from "./views/private/NuevoProveedor";
import Categorias from "./views/private/Categorias";
import NuevaCategoria from "./views/private/NuevaCategoria";
import NuevoProducto from "./views/private/NuevoProducto";
import ServiciosInternet from "./views/private/ServiciosInternet";
import NuevoServicioInternet from "./views/private/NuevoServicioInternet";
import Compras from "./views/private/Compras";
import NuevaCompra from "./views/private/NuevaCompra";
import Contrataciones from "./views/private/Contrataciones";
import Ventas from "./views/private/Ventas";
import ComprasDetalles from "./views/private/ComprasDetalles";
import VentasDetalles from "./views/private/VentasDetalles";

const App = () => {
  return (
    <HashRouter>
      <AutenticacionProvider>
        <Routes>
          <Route element={<ContenedorPublico />}>
            <Route index path="/login" Component={Login} />
            <Route path="/recuperacion" Component={Recuperacion} />
            <Route path="/crear-cuenta" Component={CrearCuenta} />
          </Route>

          <Route path="/" element={<ContenedorPrivado />}>
            <Route index Component={Inicio} />
            <Route path="/productos" Component={Productos}/>
            <Route path="/productos/nuevo" Component={NuevoProducto}/>
            <Route path="/proveedores" Component={Provedoores}/>
            <Route path="/proveedores/nuevo" Component={NuevoProveedor}/>
            <Route path="/categorias" Component={Categorias}/>
            <Route path="/categorias/nuevo" Component={NuevaCategoria}/>
            <Route path="/internet" Component={ServiciosInternet}/>
            <Route path="/internet/nuevo" Component={NuevoServicioInternet}/>
            <Route path="/compras" Component={Compras}/>
            <Route path="/compras/nueva" Component={NuevaCompra}/>
            <Route path="/compras/:id" Component={ComprasDetalles}/>
            <Route path="/contrataciones" Component={Contrataciones}/>
            <Route path="/ventas" Component={Ventas}/>
            <Route path="/ventas/:id" Component={VentasDetalles}/>
          </Route>

          <Route path="*" element={<NoEncontrado />}/>
        </Routes>
      </AutenticacionProvider>
    </HashRouter>
  );
};

export default App;
