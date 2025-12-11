import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slidebarprestamista from "../../components/slidebarprestamista";

function PrestamistaPrestamos() {
  const navigate = useNavigate();
  const [prestamos, setPrestamos] = useState([]);
  const [filtroInput, setFiltroInput] = useState("");         
  const [filtroAplicado, setFiltroAplicado] = useState("");  

  const prestamistaId = localStorage.getItem("prestamistaId");

  useEffect(() => {
    if (!prestamistaId) {
      console.error("No se encontró prestamistaId en sessionStorage");
      return;
    }

    fetch(`https://localhost:7105/api/OfertaPrestamo/prestamista/${prestamistaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición al backend");
        return res.json();
      })
      .then((data) => {
        setPrestamos(data);
      })
      .catch((err) => console.error("Error cargando ofertas:", err));
  }, [prestamistaId]);


   const parsearMontoInput = (valor) => {
    if (!valor && valor !== 0) return NaN;
    const limpio = String(valor).replace(/\s/g, "").replace(/\$/g, "").replace(/,/g, "");
    return parseFloat(limpio);
  };

  const prestamosFiltrados = prestamos.filter((p) => {
  if (!filtroAplicado) return true; 

  const montoFiltro = parsearMontoInput(filtroAplicado);
  if (Number.isNaN(montoFiltro)) return false;

  const min = Number(p.montoMin);
  const max = Number(p.montoMax);

  return montoFiltro >= min && montoFiltro <= max;
});


  const manejarFiltrar = () => {
    setFiltroAplicado(filtroInput);
  };

  const manejarLimpiar = () => {
    setFiltroInput("");
    setFiltroAplicado("");
  };

  const verPrestamo = (id) => {
    navigate(`/prestamista/oferta/${id}`);
};

  return (
    <>
      <Slidebarprestamista />

      <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
        <div className="flex items-center justify-between">
          <div className="lg:mx-50">
            <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">
              Ofertas Préstamos
            </h1>
            <p className="text-muted-foreground text-gray-600">
              Administra todas las ofertas de préstamo realizadas
            </p>
          </div>

          <button
           className="btn btn-primary lg:mx-50 lg:w-40 mx-2 w-20 mt-16 bg-cyan-600 hover:bg-cyan-300 hover:text-black border-cyan-600"
            onClick={() => navigate("/prestamista/crearoferta")}
          >
            + Nuevo Préstamo
          </button>
        </div>

        <div className="space-y-6 rounded-2xl lg:mx-50 py-10 bg-white text-black shadow-md">
          <div className="flex items-center justify-star">
            <input
              type="text"
              placeholder="Buscar ofertas de prestamos..."
              className="input input-info mx-1 lg:ml-20 px-5 bg-white text-black"
              value={filtroInput}
              onChange={(e) => setFiltroInput(e.target.value)}
            />

            <button
              className="btn btn-outline btn-info lg:mx-3 lg:px-6 "
              onClick={manejarFiltrar}
            >
              Filtros
            </button>

            <button
              className="btn btn-outline btn-secondary"
              onClick={manejarLimpiar}
            >
              Limpiar
            </button>
          </div>

          <div className="overflow-x-auto lg:px-20">
            <table className="table w-full">
              <thead>
                <tr className="text-black">
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Monto Mínimo</th>
                  <th>Monto Máximo</th>
                  <th>Tasa</th>
                  <th>Cuotas</th>
                  <th>Frecuencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {prestamosFiltrados.length > 0 ? (
                  prestamosFiltrados.map((p, index) => (
                    <tr key={index} className="text-base">
                      <td className="font-bold h-10 ">{`Prestamo ${p.categoria} #${p.ofertaPrestamoId}`}</td>
                      <td className="capitalize">{p.categoria}</td>
                      <td   >${p.montoMin}</td>
                      <td>${p.montoMax}</td>
                      <td>{p.interes}%</td>
                      <td>{p.cuotas}</td>
                      <td className="capitalize">{p.frecuencia}</td>
                      <td>
                        <button className="btn btn-outline btn-accent" onClick={() => verPrestamo(p.ofertaPrestamoId)}>Ver</button>
                      </td>
                    </tr>
                  ))
                  ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-gray-500 py-6">
                      No hay ofertas de prestamos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrestamistaPrestamos;
