import Slidebarprestamista from "../../components/slidebarprestamista";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrestamistaTransacciones() {
    const navigate = useNavigate();
    const [transacciones, setTransacciones] = useState([]);
    
      const prestamistaId = localStorage.getItem("prestamistaId");
    
      useEffect(() => {
        const fetchPagos = async () => {
          try {
            const res = await fetch(`https://localhost:7105/prestamista-transacciones/${prestamistaId}`);
            if (!res.ok) throw new Error("Error al cargar los pagos");
            const data = await res.json();
    
            setTransacciones(data);
          } catch (error) {
            console.error(error);
            alert("Error al cargar los pagos");
          }
        };
    
        fetchPagos();
      }, [prestamistaId]);
    
    
    return(
        <>
        <Slidebarprestamista></Slidebarprestamista>
        <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
        <div className="lg:mx-50">
      <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">Transaccion</h1>
      <p className="text-muted-foreground">Gestiona la información de las transacciones de tus prestamos</p>
     </div>

    <div className="space-y-6 rounded-2xl lg:mx-50 py-10 bg-white text-black shadow-md">
      
      <div className="lg:mx-10 space-y-4">
        {transacciones.map((pagos) => (
          
          <div key={pagos.transaccionId} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors border-gray-200 bg-white text-black shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-2xl mb-8">Prestamo {pagos.categoria} #{pagos.ofertaPrestamoId}</h2>
              <p className="text-gray-500 font-sans text-sm mb-2">Nombre: <span className="text-base font-semibold text-gray-900">{pagos.clienteNombre}</span></p>
              <p className="text-gray-500 font-sans text-sm mb-2">Identificacion: <span className="text-base font-semibold text-gray-900">{pagos.clienteDocumento}</span></p>
              <p className="text-gray-500 font-sans text-sm mb-2">Telefono: <span className="text-base font-semibold text-gray-900">{pagos.clienteTelefono}</span></p>
              <p className="text-gray-500 font-sans text-sm mb-2">Email: <span className="text-base font-semibold text-gray-900">{pagos.clienteEmail}</span></p>
              
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-left">
                <p className="text-gray-500 font-sans text-sm my-3">Pago realizado: <span className="text-base font-semibold text-gray-900">${pagos.monto}</span></p>
                <p className="text-gray-500 font-sans text-sm my-3">Fecha de pago: <span className="text-base font-semibold text-gray-900">{new Date(pagos.fechaPago).toLocaleDateString()}</span></p>
                <p className="text-gray-500 font-sans text-sm my-3">Saldo restante del prestamo: <span className="text-base font-semibold text-gray-900">{pagos.saldoRestante}</span></p>
              <div className="flex gap-4 text-sm text-gray-600">
                <p className="text-sm font-semibold text-gray-900">{pagos.tipoTransaccion}</p>
              </div>
              <button className="btn btn-primary mt-5 w-50" onClick={() => navigate(`/prestamista/prestamos/${pagos.prestamoId}`)}>VER PRESTAMO</button>
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

export default PrestamistaTransacciones