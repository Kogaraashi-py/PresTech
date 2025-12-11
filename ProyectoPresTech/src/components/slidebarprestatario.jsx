import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function Slidebarprestatario() {

    const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const idPersona = localStorage.getItem("personaId");
    
        useEffect(() => {
            if (!idPersona) {
                console.error("No se encontró la id de la persona en localStorage");
                return;
            }
    
            fetch(`https://localhost:7105/api/Persona/${idPersona}`)
                .then(res => {
                    if (!res.ok) throw new Error("Error al obtener persona");
                    return res.json();
                })
                .then(data => {
                    console.log("Persona cargada:", data);
                    setEmail(data.email);
                })
                .catch(err => console.error("Error cargando persona:", err));
        }, [idPersona]);
    



    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar bg-gray-900 shadow-sm h-full text-white">
                    <div className="flex-none lg:mx-5">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <a className="text-3xl text-center font-bold">PresTech</a>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-ghost border-cyan-500 text-cyan-500 hover:bg-blue-500 hover:text-white lg:w-30 lg:mx-5" onClick={() => navigate("/login")}>Salir</button>
                    </div>
                </div>
                <div className="p-4">
                </div>
            </div>
            
            {/* Sidebar */}
            <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

            <div className="flex flex-col justify-between h-full w-80 bg-gray-900 p-4 text-white">
            <ul className="menu">
                <li className="mb-10 text-3xl font-semibold text-center">Menu Principal</li>
                <li><a href="/prestatario/dashboard" className="mb-3 text-base font-extralight hover:bg-blue-500">Dashboard</a></li>
                <li><a href="/prestatario/ofertaprestamo" className="mb-3 text-base font-extralight hover:bg-blue-500">Ofertas Prestamos</a></li>
                <li><a href="/prestatario/pagos" className="mb-3 text-base font-extralight hover:bg-blue-500">Pagos</a></li>
                <li><a href="/prestatario/prestamos" className="mb-3 text-base font-extralight hover:bg-blue-500">Prestamos</a></li>
                <li><a href="/prestatario/historial" className="mb-3 text-base font-extralight hover:bg-blue-500">Historial</a></li>
            </ul>

            <div className="mt-4">
             <p className="font-thin">Prestatario</p>
             <p className="my-2 font-semibold hover:text-blue-200">{email}</p>
            </div>

            </div>
        </div>
    </div>
    )
 
}

export default Slidebarprestatario;