import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Prestamista
import PrestamistaDashboard from "./pages/Prestamista/PrestamistaDashboard.jsx";
import PrestamistaPrestamos from "./pages/Prestamista/PrestamistaPrestamos.jsx";
import PrestamistaDetallePrestamo from "./pages/Prestamista/PrestamistaDetallePrestamo.jsx";
import PrestamistaOfertas from "./pages/Prestamista/PrestamistaOfertas.jsx";
import PrestamistaOfertaPrestamo from "./pages/Prestamista/PrestamistaOfertaPrestamo.jsx";
import PrestamistaDetalleOferta from "./pages/Prestamista/PrestamistaDetalleOferta.jsx";
import PrestamistaClientes from "./pages/Prestamista/PrestamistaClientes.jsx";
import PrestamistaEditarOferta from "./pages/Prestamista/PrestamistaEditarOferta.jsx";
import PrestamistaDetalleCliente from "./pages/Prestamista/PrestamistaDetalleCliente.jsx";
import PrestamistaTransacciones from "./pages/Prestamista/PrestamistaTransacciones.jsx";

// Prestatario
import PrestatarioDashboard from "./pages/Prestatario/PrestatarioDashboard.jsx";
import PrestatarioOfertaPrestamo from "./pages/Prestatario/PrestatarioOfertaPrestamo.jsx";
import PrestatarioPrestamos from "./pages/Prestatario/PrestatarioPrestamos.jsx";
import PrestatarioDetallePrestamo from "./pages/Prestatario/PrestatarioDetallePrestamo.jsx";
import PrestatarioHistorial from "./pages/Prestatario/PrestatarioHistorial.jsx";
import PrestatarioDetalleOferta from "./pages/Prestatario/PrestatarioDetalleOferta.jsx";
import PrestatarioPagos from "./pages/Prestatario/PrestatarioPagos.jsx";

function App() {

  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />


        <Route
          path="/Prestamista/Dashboard"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestamista/OfertasPrestamos"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaOfertas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestamista/Prestamos"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaPrestamos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prestamista/prestamos/:prestamoId"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaDetallePrestamo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestamista/CrearOferta"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaOfertaPrestamo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestamista/EditarOferta/:id"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaEditarOferta />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prestamista/oferta/:id"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaDetalleOferta />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestamista/Clientes"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaClientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prestamista/cliente/:prestatarioId"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaDetalleCliente />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestamista/Transacciones"
          element={
            <ProtectedRoute role="prestamista">
              <PrestamistaTransacciones />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestatario/Dashboard"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestatario/OfertaPrestamo"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioOfertaPrestamo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prestatario/oferta/:id"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioDetalleOferta />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestatario/Prestamos"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioPrestamos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prestatario/prestamos/:prestamoId"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioDetallePrestamo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestatario/Historial"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioHistorial />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Prestatario/Pagos"
          element={
            <ProtectedRoute role="prestatario">
              <PrestatarioPagos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

