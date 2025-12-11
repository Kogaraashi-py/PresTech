import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slidebarprestatario from '../../components/slidebarprestatario';

function PrestatarioDashboard() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState(null);

    const prestatarioId = localStorage.getItem("prestatarioId");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch(`https://localhost:7105/api/Prestatario/${prestatarioId}/dashboard`);
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

        if (prestatarioId) {
            fetchDashboard();
        }
    }, [prestatarioId]);
    return(
        <>
        <Slidebarprestatario></Slidebarprestatario>
        <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
        <div className="flex items-center justify-between">
        <div className="lg:mx-40">
          <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">Dashboard</h1>
          <p className="text-muted-foreground text-gray-600">Resumen general de tu cartera de préstamos</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Deuda total</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                ${dashboard?.deudaTotal?.toLocaleString('es-CO')}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Saldos de prestamos restantes</div>
          </div>

          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Pagos</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                ${dashboard?.totalPagado?.toLocaleString('es-CO')}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Pagos realizados totales</div>
          </div>

          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Proximo pago</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
              {(!dashboard?.proximoPago || dashboard.proximoPago.startsWith("0001"))
                ? "No hay pagos proximos"
                : new Date(dashboard.proximoPago).toLocaleDateString('es-CO')
              }
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Fecha del proximo pago</div>
          </div>

          <div className="card w-100 h-40 mb-2 bg-white text-black shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="card-body">
              <span className="card-title">Pagados</span>
            </div>
            <div className="mx-3 font-semibold text-3xl ml-5">
                {dashboard?.pagosVencidos}
            </div>
            <div className="mx-3 mb-2 font-light ml-5">Prestamos finalizados</div>
          </div>
      </div>

      <div className="space-y-6 rounded-2xl lg:mx-35 py-15 bg-white text-black shadow-md">
        <div className="flex items-center justify-between lg:mx-10">
          <h2 className="text-4xl font-bold text-foreground mb-5">Préstamos Recientes</h2>
          <a 
            href="/Prestatario/Prestamos" 
            className="hover:bg-gray-200 duration-300 ease-in-out rounded-xl lg:mx-10 text-black cursor-pointer px-4 py-2"
          >
            Ver todos
          </a>
        </div>

        <div className="lg:mx-10 space-y-4">
          {dashboard?.ultimosPrestamos && dashboard.ultimosPrestamos.length > 0 ? (
            dashboard.ultimosPrestamos.map((d) => (
              <div 
                key={d.prestamoId} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors border-gray-500/30 bg-white text-black shadow-md cursor-pointer"
                onClick={() => navigate(`/prestatario/prestamos/${d.prestamoId}`)}
              >
                <div className="dashboard-d-info">
                  <div className="card-title">
                    Prestamo {d.categoria} #{d.ofertaPrestamoId} 
                    <span
                      className={`text-sm font-semibold ml-2 ${
                        d.estado === "Activo" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {d.estado}
                    </span>
                  </div>
                 <div className="text-gray-500 text-sm">
                  Próximo pago: {
                    d.estado === "Pagado"
                      ? "Finalizado"
                      : d.fechaPago
                        ? new Date(d.fechaPago).toLocaleDateString("es-CO", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                          })
                        : "—"
                  }
                </div>
                </div>
                <div className="font-light text-gray-500">
                  Saldo restante: <span className="font-semibold text-xl">${d.monto?.toLocaleString('es-CO')}</span>
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

export default PrestatarioDashboard;