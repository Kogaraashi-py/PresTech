import Slidebarprestatario from "../../components/slidebarprestatario"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrestatarioHistorial() {
  const [transacciones, setTransacciones] = useState([]);
  const navigate = useNavigate();

  const prestatarioId = localStorage.getItem("prestatarioId");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await fetch(`https://localhost:7105/api/Transaccion/por-prestatario/${prestatarioId}`);
        if (!res.ok) throw new Error("Error al cargar los pagos");
        const data = await res.json();

        setTransacciones(data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar los pagos");
      }
    };

    fetchPagos();
  }, [prestatarioId]);

  

    return(
        <>
        <Slidebarprestatario></Slidebarprestatario>
        <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
        <div className="lg:mx-50">
      <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">Historial</h1>
      <p className="text-muted-foreground">Gestiona la información de los pagos realizados</p>
     </div>

    <div className="space-y-6 rounded-2xl lg:mx-50 py-10 bg-white text-black shadow-md">
      
      <div className="lg:mx-10 space-y-4">
        {transacciones.map((pagos) => (
          
          <div key={transacciones.transaccionId} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors border-gray-200 bg-white text-black shadow-sm">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-gray-900">Prestamo {pagos.categoria} #{pagos.ofertaPrestamoId}</h3>
              <div className="flex gap-4 text-sm text-gray-600">
                <p>Fecha de pago: {new Date(pagos.fechaPago).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">${pagos.monto}</p>
                <p className="text-sm text-gray-600">{pagos.tipoTransaccion}</p>
              <div className="flex gap-4 text-sm text-gray-600 justify-end">
                <button className="btn btn-primary mt-3 h-8" onClick={() => navigate(`/prestatario/prestamos/${pagos.prestamoId}`)}>VER PRESTAMO</button>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
        </>
    )
}

export default PrestatarioHistorial