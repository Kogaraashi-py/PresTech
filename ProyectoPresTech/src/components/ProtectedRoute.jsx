import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/Login" />;
  }

  if (role && usuario.rol !== role) {
    return <Navigate to="/Login" />;
  }

  return children;
}

export default ProtectedRoute;

