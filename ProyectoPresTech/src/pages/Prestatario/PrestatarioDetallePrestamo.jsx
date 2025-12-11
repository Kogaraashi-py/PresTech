import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slidebarprestatario from "../../components/slidebarprestatario";

function PrestatarioDetallePrestamo(){
    const { prestamoId } = useParams();
    const navigate = useNavigate();
    const [prestamo, setPrestamo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetallePrestamo = async () => {
            try {
                const response = await fetch(`https://localhost:7105/api/Prestamo/${prestamoId}/detalle-prestatario`);
                if (!response.ok) {
                    throw new Error('Error al cargar el préstamo');
                }
                const data = await response.json();
                setPrestamo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetallePrestamo(); 
    }, [prestamoId]);

    
    const tieneTransaccion = prestamo?.fechaPago && prestamo.fechaPago !== "0001-01-01T00:00:00";

    return(
        <>
        <Slidebarprestatario />
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline btn-error flex items-center gap-2 text-base font-medium px-5 py-6 rounded-lg w-fit mx-7"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                    Volver para atrás
                </button>
        <div className="flex justify-center my-10">
            <h1 className="text-black mx-5 font-bold text-3xl">
                Prestamo {prestamo?.categoriaPrestamo} #{prestamo?.ofertaPrestamoId}
            </h1>
            <p className="mt-2 font-light text-neutral-600">
                Estado: <span className="font-bold text-black">{prestamo?.estado}</span>
            </p>
        </div>
        <div className="w-full grid grid-rows-2 grid-cols-2 gap-2 justify-start content-center">
            <div className="text-black bg-white rounded-xl shadow-md h-60">
                <div className="mx-5 my-5">
                <h2 className=" font-sans mt-2 text-xl mb-8">Saldo Restante</h2>
                <p className="text-3xl mb-8">
                    ${prestamo?.saldoRestante?.toLocaleString('es-CO')} <span>de ${prestamo?.saldoPrestamo?.toLocaleString('es-CO')}</span>
                </p> 
                <div className="flex justify-items-stretch">
                <div className="mr-5 bg-gray-300/30 rounded-xl w-30 h-14">
                    <p className="text-neutral-600 font-light ml-2">Proximo Pago</p>
                    <p className="font-medium text-black ml-2">
                        {
                        prestamo?.estado === "Pagado"
                        ? "Finalizado"
                        : prestamo?.fechaProxPago
                            ? new Date(prestamo?.fechaProxPago).toLocaleDateString("es-CO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            })
                            : "—"
                        }
                    </p>
                </div>
                <div className="mr-5 bg-gray-300/30 rounded-xl w-20">
                    <p className="text-neutral-600 font-light ml-2">% Tasa</p>
                    <p className="font-medium text-black ml-2">{prestamo?.tasas}%</p>
                </div>
                <div className="mr-5 bg-gray-300/30 rounded-xl w-25">
                    <p className="text-neutral-600 font-light ml-2">Frecuencia</p>
                    <p className="font-medium text-black ml-2">{prestamo?.frecuencia}</p>
                </div>
                <div className="mr-5 bg-gray-300/30 rounded-xl w-30">
                    <p className="text-neutral-600 font-light ml-2"># Oferta ID</p>
                    <p className="font-medium text-black ml-2">{prestamo?.ofertaPrestamoId}</p>
                </div>
                </div>
                </div>
            </div>

            <div className="text-black bg-white rounded-xl shadow-md">
                <div className="mx-5 my-5">
                <h2 className=" font-sans mt-2 text-xl mb-8">Prestamista</h2>
                <p className="text-3xl mb-8">{prestamo?.nombrePrestamista}</p>
                <div className="divider divider-neutral"></div>
                <p className="text-neutral-600 font-light">
                    Correo <span className="font-medium text-black">{prestamo?.emailPrestamista}</span>
                </p>
                <div className="divider divider-neutral"></div>
                <p className="text-neutral-600 font-light">
                    Telefono <span className="font-medium text-black">{prestamo?.telefonoPrestamista}</span>
                </p>
                </div>
            </div>

            <div className="text-black bg-white rounded-xl shadow-md ">
                <div className="mx-5 my-5">
                <h2 className=" font-sans mt-2 text-xl mb-8">Proceso de cuotas</h2>
                <p className="text-neutral-600 font-light">
                    Cuotas Restantes: <span className="font-medium text-black">{prestamo?.cuotasRestantes}</span>
                </p>
                <p className="text-neutral-600 font-light">
                    Cuotas Totales: <span className="font-medium text-black">{prestamo?.cuotasTotales}</span>
                </p>
                <div className="divider divider-neutral"></div>
                <h2 className=" font-sans mt-2 text-xl mb-8">Ultimo Pago</h2>
                {tieneTransaccion ? (
                    <>
                        <p className="text-neutral-600 font-light">
                            Monto del Pago: <span className="font-medium text-black">
                                ${prestamo.montoPagado?.toLocaleString('es-CO')}
                            </span>
                        </p>
                        <p className="text-neutral-600 font-light">
                            Fecha del Pago: <span className="font-medium text-black">
                                {new Date(prestamo.fechaPago).toLocaleDateString('es-CO')}
                            </span>
                        </p>
                        <p className="text-neutral-600 font-light">
                            Metodo de Pago: <span className="font-medium text-black">
                                {prestamo.tipoPago}
                            </span>
                        </p>
                    </>
                ) : (
                    <p className="text-neutral-600 font-light">No hay transacciones registradas</p>
                )}
                </div>
            </div>

            <div className="text-black flex justify-center">
                <button className="btn btn-primary px-20 mt-5 mx-5" onClick={() => navigate(`/Prestatario/Historial`)}>Ver historial de pagos</button>
                <button className="btn btn-outline btn-secondary px-20 mt-5 mx-5" onClick={() => navigate(`/prestatario/pagos`)} disabled={prestamo?.saldoRestante == 0}>Realizar pago</button>
            </div>
        </div>


        </div>
        </>
    )
}

export default PrestatarioDetallePrestamo;