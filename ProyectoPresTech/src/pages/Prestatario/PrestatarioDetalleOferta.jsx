import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slidebarprestatario from "../../components/slidebarprestatario";

function PrestatarioDetalleOferta() {
    const { id } = useParams();
    const [oferta, setOferta] = useState(null);
    const [montoPedido, setMontoPedido] = useState("");
    const prestatarioId = localStorage.getItem("prestatarioId");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7105/api/OfertaPrestamo/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Oferta cargada:", data);
                setOferta(data);
            })
            .catch(err => console.error("Error obteniendo la oferta:", err));
    }, [id]);

    const guardarPrestamo = async () => {
        if (!montoPedido) {
            alert("Debe ingresar un monto válido");
            return;
        }

        if (!oferta) return;

        const monto = Number(montoPedido);

        if (monto < oferta.montoMin || monto > oferta.montoMax) {
            alert(`El monto debe estar entre ${oferta.montoMin} y ${oferta.montoMax}`);
            return;
        }

        const payload = {
            prestatarioId: Number(prestatarioId),
            ofertaPrestamoId: oferta.ofertaPrestamoId,
            saldoPrestamo: monto.toString(),
            saldoRestante: monto
        };


        try {
            const res = await fetch("https://localhost:7105/api/Prestamo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error backend:", errorText);
                throw new Error("Error al guardar");
            }

            const data = await res.json();

            alert("Préstamo solicitado con éxito");
            navigate("/prestatario/prestamos");

        } catch (err) {
            console.error("Error:", err);
            alert("Hubo un error al crear el préstamo");
        }
    };

    if (!oferta) return <p>Cargando oferta...</p>;

    return (
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

                <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl">
                    <h1 className="text-3xl font-bold mb-3 text-black">
                        Préstamo {oferta.categoria} #{oferta.ofertaPrestamoId}
                    </h1>

                    <p className="text-gray-600 mb-5">
                        Monto entre{" "}
                        <span className="font-bold">${oferta.montoMin}</span> y
                        <span className="font-bold"> ${oferta.montoMax}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <p><strong>Interés:</strong> {oferta.interes}%</p>
                        <p><strong>Cuotas:</strong> {oferta.cuotas}</p>
                        <p><strong>Frecuencia:</strong> {oferta.frecuencia}</p>
                        <p><strong>Descripción:</strong> {oferta.descripcion}</p>
                    </div>

                    <div className="mt-8">
                        <label className="block mb-2 text-lg font-medium text-black">
                            Monto solicitado
                        </label>

                        <input
                            type="number"
                            className="input input-bordered w-full bg-white text-black border-gray-400"
                            placeholder={`Entre ${oferta.montoMin} y ${oferta.montoMax}`}
                            value={montoPedido}
                            onChange={(e) => setMontoPedido(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn btn-primary mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full"
                        onClick={guardarPrestamo}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </>
    );
}

export default PrestatarioDetalleOferta;
