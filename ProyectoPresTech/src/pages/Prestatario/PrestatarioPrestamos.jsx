import { useNavigate } from "react-router-dom";
import Slidebarprestatario from "../../components/slidebarprestatario";
import { useEffect, useState } from "react";

function PrestatarioPrestamos() {
    const navigate = useNavigate();
    const [prestamos, setPrestamos] = useState([]);
    const prestatarioId = localStorage.getItem("prestatarioId")
    const [busquedaInput, setBusquedaInput] = useState("");
    const [busquedaFinal, setBusquedaFinal] = useState("");

   const obtenerPrestamosDelPrestatario = async () => {
    try {
      const res = await fetch(
        `https://localhost:7105/api/Prestamo/por-prestatario/${prestatarioId}`
      );

      if (!res.ok) {
        console.error("Error en backend");
        return;
      }

      const data = await res.json();
      setPrestamos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerPrestamosDelPrestatario();
  }, []);

  const prestamosFiltrados = prestamos.filter((p) =>
  p.saldoPrestamo
    ?.toString()
    .toLowerCase()
    .includes(busquedaFinal.toLowerCase())
);

 const aplicarFiltro = () => {
  setBusquedaFinal(busquedaInput);
};
    
    
    return(
        <>
        <Slidebarprestatario></Slidebarprestatario>
    <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
      <div className="flex items-center justify-between">
        <div className="lg:mx-50">
          <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">Préstamos</h1>
          <p className="text-muted-foreground">Administra todos los préstamos activos y antiguos</p>
        </div>
      </div>

      <div className="space-y-6 rounded-2xl lg:mx-50 py-10 bg-white text-black shadow-md">
        <div className="flex items-center justify-star">
        <input
          type="text"
          placeholder="Buscar préstamos..."
           className="input input-info mx-1 lg:ml-20 px-5 bg-white text-black"
           onChange={(e) => setBusquedaInput(e.target.value)}
        />
        <button className="btn btn-outline btn-info lg:mx-8 lg:px-6 " onClick={aplicarFiltro}>Filtros</button>
        <button className="btn btn-outline btn-secondary lg:px-6 " onClick={() => {setBusquedaFinal(""), setBusquedaInput("")}} >Limpiar</button>
        </div>
      

    <div className="overflow-x-auto lg:px-20">
      <table className="table">
        <thead>
          <tr className="text-black text-base">
            <th>Nombre</th>
            <th>Monto</th>
            <th>Saldo restante</th>
            <th>Cuotas</th>
            <th>Interes</th>
            <th>Proximo Pago</th>
            <th>Frecuencia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamosFiltrados.length > 0 ? (
          prestamosFiltrados.map((p, index) => (
            <tr key={index} className="text-base">
              <td className="w-85">Prestamo {p.categoriaPrestamo} #{p.ofertaPrestamoId}</td>
              <td>{p.saldoPrestamo}</td>
              <td>{p.saldoRestante}</td>
              <td>{p.cuotasRestantes} / {p.cuotasTotales}</td>
              <td>{p.tasas}%</td>
              <td>{
                    p.estado === "Pagado"
                      ? "Finalizado"
                      : p.fechaProxPago
                        ? new Date(p.fechaProxPago).toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                          })
                        : "—"
                  }</td>
              <td>{p.frecuencia}</td>
              <td>
                <span className={`estado ${p.estado.toLowerCase()}`}>
                  {p.estado}
                </span>
              </td>
              <td>
                <button className="btn btn-outline btn-accent" onClick={() => navigate(`/prestatario/prestamos/${p.prestamoId}`)}>Ver</button>
              </td>
            </tr>
          ))
          ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-gray-500 py-6">
                      No hay préstamos registrados.
                    </td>
                  </tr>
                )}
        </tbody>
      </table>
      </div>
    </div>
    </div>
        </>
    )
}

export default PrestatarioPrestamos