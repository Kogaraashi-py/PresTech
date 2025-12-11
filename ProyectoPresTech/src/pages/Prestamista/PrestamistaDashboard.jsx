import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slidebarprestamista from "../../components/slidebarprestamista";

function PrestamistaDashboard() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const prestamistaId = localStorage.getItem("prestamistaId");
    

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch(`https://localhost:7105/api/Prestamista/${prestamistaId}/dashboard`);
                if (!response.ok) {
                    throw new Error('Error al cargar el dashboard');
                }
                const data = await response.json();
                setDashboard(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (prestamistaId) {
            fetchDashboard();
        }
    }, [prestamistaId]);
    return(
        <>
        <Slidebarprestamista />
        <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
        <div className="flex items-center justify-between">
        <div className="lg:mx-40">
          <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">Dashboard</h1>
          <p className="text-muted-foreground text-gray-600">Resumen general de tu cartera de préstamos</p>
        </div>
        <button
          className="btn btn-primary lg:mx-40 lg:w-40 mx-2 w-20 mt-16 bg-cyan-600 hover:bg-cyan-300 hover:text-black border-cyan-600"
          onClick={() => navigate("/prestamista/crearoferta")}
        >
          + Nuevo Préstamo
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Total</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                ${dashboard?.totalPrestamosActivos?.toLocaleString('es-CO')}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Préstamos Activos y pagados</div>
          </div>

          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Este mes</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                ${dashboard?.pagosRecibidosMes?.toLocaleString('es-CO')}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Pagos recibidos</div>
          </div>

          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Activos</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                {dashboard?.clientesActivos}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Clientes</div>
          </div>

          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Ofertas</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                {dashboard?.ofertasCreadas}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Ofertas de Préstamos creadas</div>
          </div>
      </div>

      <div className="space-y-6 rounded-2xl lg:mx-35 py-15 bg-white text-black shadow-md">
        <div className="flex items-center justify-between lg:mx-10">
          <h2 className="text-4xl font-bold text-foreground mb-5">Préstamos Recientes</h2>
          <a 
            href="/Prestamista/Prestamos" 
            className="hover:bg-gray-200 duration-300 ease-in-out rounded-xl lg:mx-10 text-black cursor-pointer px-4 py-2"
          >
            Ver todos
          </a>
        </div>

        <div className="lg:mx-10 space-y-4">
          {dashboard?.prestamosRecientes && dashboard.prestamosRecientes.length > 0 ? (
            dashboard.prestamosRecientes.map((d) => (
              <div 
                key={d.prestamoId} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors border-gray-500/30 bg-white text-black shadow-md cursor-pointer"
                onClick={() => navigate(`/prestamista/prestamos/${d.prestamoId}`)}
              >
                <div className="dashboard-d-info">
                  <div className="card-title">Prestamo {d.categoria} #{d.ofertaPrestamoId}</div>
                  <div className="text-gray-500 text-sm">
                    Fecha: {new Date(d.fechaInicio).toLocaleDateString('es-CO')}
                  </div>
                </div>
                <div className="font-semibold text-xl">
                  ${d.monto?.toLocaleString('es-CO')}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              No hay préstamos recientes
            </div>
          )}
        </div>
      </div>
    </div>
        </>
    )
}

export default PrestamistaDashboard;