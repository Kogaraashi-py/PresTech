import { useEffect, useState } from "react";
import Slidebarprestatario from "../../components/slidebarprestatario";
import { useNavigate } from "react-router-dom";

function PrestatarioOfertaPrestamo() {
    const [ofertas, setOfertas] = useState([]);
    const [filtroMontoInput, setFiltroMontoInput] = useState("");
    const [filtroMontoAplicado, setFiltroMontoAplicado] = useState("");


    useEffect(() => {
        fetch("https://localhost:7105/api/OfertaPrestamo")
            .then((res) => res.json())
            .then((data) => setOfertas(data))
            .catch((err) => console.error("Error cargando ofertas:", err));
    }, []);

    const ofertasFiltradas = ofertas.filter((o) => {
    if (!filtroMontoAplicado) return true;

    const monto = parseFloat(filtroMontoAplicado);

    return monto >= o.montoMin && monto <= o.montoMax;
});

const navigate = useNavigate();

const solicitarPrestamo = (id) => {
    navigate(`/prestatario/oferta/${id}`);
};

    return (
        <>
            <Slidebarprestatario />

            <div className="min-h-screen bg-linear-to-tl from-gray-100 to-gray-200 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 text-black">Ofertas de Préstamo</h1>
                    <p className="text-gray-600 mb-6">
                        Compara las ofertas disponibles y solicita la que más se ajuste a tus necesidades.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <aside className="col-span-1">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="font-semibold mb-3 text-black">Monto del préstamo</h3>
                                <div className="mt-2 mb-4">
                                    <input
                                        className="input input-bordered w-full bg-white text-gray-700 border-gray-500/30"
                                        placeholder="$250,000"
                                        onChange={(e) => setFiltroMontoInput(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3 mt-4">
                                <button className="btn btn-block bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500" onClick={() => setFiltroMontoAplicado(filtroMontoInput)} >
                                    Filtrar
                                </button>
                                <button className="btn btn-block bg-white hover:bg-gray-300 text-black border-gray-300"
                                    onClick={() => {
                                     setFiltroMontoInput("");
                                     setFiltroMontoAplicado("");
                                    }}
                                >
                                    Limpiar
                                </button>
                                </div>
                            </div>
                        </aside>

                        <section className="col-span-1 lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {ofertasFiltradas.map((o, i) => (
                                    <div key={i} className="bg-white rounded-lg shadow p-5">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-black">
                                                    Prestamo {o.categoria} #{o.ofertaPrestamoId}
                                                </h3>
                                                <p className="text-base text-gray-500 mt-1">
                                                    ${o.montoMin} - ${o.montoMax}
                                                </p>
                                            </div>

                                            <div>
                                                <button
                                                    className="btn btn-sm btn-primary text-white bg-blue-500 hover:bg-blue-700"
                                                    onClick={() => solicitarPrestamo(o.ofertaPrestamoId)}
                                                >
                                                    Solicitar
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mt-4">
                                            Interés:
                                            <div className="font-semibold text-black">{o.interes}%</div>
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                                            <div>
                                                <p className="text-xs">Cuotas</p>
                                                <p className="font-medium mt-1 text-black">{o.cuotas}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs">Frecuencia</p>
                                                <p className="font-medium mt-1 capitalize text-black">
                                                    {o.frecuencia}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t pt-3 text-sm text-gray-500">
                                            <div className="mt-1 truncate w-110">{o.descripcion}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrestatarioOfertaPrestamo;
