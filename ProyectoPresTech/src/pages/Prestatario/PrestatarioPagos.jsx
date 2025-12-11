import { useEffect, useState } from "react";
import Slidebarprestatario from "../../components/slidebarprestatario"

function PrestatarioPagos() {
    
    const [prestamos, setPrestamos] = useState([]);
    const prestatarioId = localStorage.getItem("prestatarioId");
    const [selectedPrestamo, setSelectedPrestamo] = useState(null);
    const [cuota, setCuota] = useState(0);
    const [metodoPago, setMetodoPago] = useState("");
    const prestamosActivos = prestamos.filter(p => p.estado.toLowerCase() !== "pagado");

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7105/api/Prestamo/por-prestatario/${prestatarioId}`
                );
                const data = await res.json();
                setPrestamos(data);
            } catch (error) {
                console.error("Error cargando préstamos:", error);
            }
        };

        fetchPrestamos();
    }, [prestatarioId]);

    const calcularCuota = (prestamo) => {
        if (!prestamo) return 0;

        const P = prestamo.saldoPrestamo;
        const n = prestamo.cuotasTotales;
        let i = prestamo.tasas / 100;

        switch (prestamo.frecuencia.toLowerCase()) {
            case "semanal":
                i = i / 52;
                break;

            case "quincenal":
                i = i / 24;
                break;

            case "mensual":
                i = i / 12;
                break;

            case "anual":
                i = i / 1;
                break;

            default:
                i = i / 12;
                break;
        }

        const C = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
        return C.toFixed(2);
    };

    const calcularProximoPago = (fechaUltimoPago, frecuencia) => {
        if (!fechaUltimoPago) return "No definido";

        const fecha = new Date(fechaUltimoPago);

        switch (frecuencia.toLowerCase()) {
            case "semanal":
                fecha.setDate(fecha.getDate() + 7);
                break;

            case "quincenal":
                fecha.setDate(fecha.getDate() + 15);
                break;

            case "mensual":
                fecha.setMonth(fecha.getMonth() + 1);
                break;

            case "anual":
                fecha.setFullYear(fecha.getFullYear() + 1);
                break;

            default:
                return "Frecuencia desconocida";
        }

        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, "0");
        const dd = String(fecha.getDate()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd}`;
    };

    const handleSelectPrestamo = (e) => {
        const prestamoId = parseInt(e.target.value);
        const prestamo = prestamos.find((p) => p.prestamoId === prestamoId);

        setSelectedPrestamo(prestamo);
        setCuota(calcularCuota(prestamo));
        calcularProximoPago(prestamo.fechaProxPago, prestamo.frecuencia);
    };

        const handleConfirmarPago = async (e) => {
        e.preventDefault(); 

        if (!selectedPrestamo || !metodoPago) return;

        const payload = {
            PrestamoId: selectedPrestamo.prestamoId,
            MontoPagado: parseFloat(cuota),
            TipoPago: metodoPago 
        };

        try {
            const res = await fetch("https://localhost:7105/api/Transaccion/registrar-pago", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.text();

            if (res.ok) {
                alert("Pago registrado con éxito");
                window.location.reload();
            } else {
                alert("Error: " + data);
            }

        } catch (error) {
            console.error("Error realizando el pago:", error);
            alert("Error en el servidor");
        }
    };

    
        
    
    return(
        <>
        <Slidebarprestatario />
        <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
            <div className="lg:mx-50">
                <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">Pagos</h1>
                <p className="text-muted-foreground">Realiza los pagos de tus préstamos activos</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:mx-50">
                {/* Lista de Préstamos */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-6 rounded-2xl py-8 bg-white text-black shadow-md">
                        <div className="px-6">
                            <h2 className="text-2xl font-semibold mb-4">Préstamos Pendientes</h2>
                            <div className="space-y-4">
                                {prestamosActivos.map((p) => (
                                    <div key={p.prestamoId} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors border-gray-400/30">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg">Prestamo {p.categoriaPrestamo} #{p.ofertaPrestamoId}</h3>
                                                <p className="text-sm text-gray-600">Próximo pago: {p.fechaProxPago?.split("T")[0]}</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-sm text-green-800">
                                                {p.estado}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5 text-sm">
                                            <div>
                                                <p className="text-gray-600">Monto total</p>
                                                <p className="font-semibold">{p.saldoPrestamo}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Monto restante</p>
                                                <p className="font-semibold">{p.saldoRestante}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Cuotas pagadas</p>
                                                <p className="font-semibold">{p.cuotasRestantes} / {p.cuotasTotales}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Próxima cuota</p>
                                                <p className="font-semibold">{calcularCuota(p)} </p>
                                            </div>

                                            <div>
                                                <p className="text-gray-600">Frecuencia del prestamo</p>
                                                <p className="font-semibold">{p.frecuencia} </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 rounded-2xl py-8 bg-white text-black shadow-md h-fit">
                    <div className="px-6">
                        <h2 className="text-2xl font-semibold mb-6">Realizar Pago</h2>
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span>Seleccionar Préstamo</span>
                                </label>
                                <select className="select select-bordered bg-white border-gray-400/30 ml-3" onChange={handleSelectPrestamo} required>
                                    <option disabled selected>Seleccione un préstamo</option>
                                    {prestamosActivos.map((p) => (
                                        <option key={p.prestamoId} value={p.prestamoId}>
                                            Prestamo {p.categoriaPrestamo} #{p.ofertaPrestamoId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span>Método de Pago</span>
                                </label>
                                <select className="select select-bordered bg-white border-gray-400/30 ml-3" onChange={(e) => setMetodoPago(e.target.value)}>
                                    <option disabled selected>Seleccione método de pago</option>
                                    <option value={"Tarjeta de credito/debito"}>Tarjeta de Credito/Debito</option>
                                    <option value={"Efectivo"}>Efectivo</option>
                                    <option value={"Transferencia"}>Transferencia</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span>Monto a Pagar</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="$0.00"
                                    value={cuota}
                                    readOnly
                                    className="input input-bordered bg-white border-gray-400/30 ml-3"
                                />
                            </div>

                            <div className="mt-6">
                                <button className="btn btn-info w-full bg-cyan-500 hover:bg-cyan-600 text-white" disabled={!selectedPrestamo || !metodoPago} onClick={handleConfirmarPago}>
                                    Confirmar Pago
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default PrestatarioPagos