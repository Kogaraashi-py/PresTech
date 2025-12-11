import { useNavigate } from "react-router-dom";

function navbar() {
    const navigate = useNavigate();

    return(
        <div className="navbar bg-gray-900 text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Caracteristicas</a></li>
        <li><a>Roles</a></li> 
        <li><a>Beneficios</a></li>
      </ul>
    </div>
    <p className="lg:text-2xl font-bold text-base hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all duration-300">PresTech</p>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-medium">
      <li><a className="hover:bg-cyan-500" href="#caracteristicas">Caracteristicas</a></li>
      <li><a className="hover:bg-cyan-500" href="#rol">Roles</a></li>
      <li><a className="hover:bg-cyan-500" href="#beneficios">Beneficios</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn lg:mr-3 mr-0 bg-cyan-500 hover:bg-blue-600 border-cyan-500"  onClick={() => navigate("/Login")}>Iniciar Sesion</a>
    <a className="btn lg:mr-3 mr-0 bg-gray-900 border-cyan-500 text-cyan-500 hover:bg-blue-600 hover:text-white hover:border-blue-600" onClick={() => navigate("/Register")}>Registrarse</a>
  </div>
</div>
    )
}

export default navbar;