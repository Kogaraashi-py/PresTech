import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slidebarprestamista from "../../components/slidebarprestamista";

function PrestamistaDetalleOferta() {
    const { id } = useParams();
    const [oferta, setOferta] = useState(null);
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

    if (oferta === null) {
        return (
            <>
                <Slidebarprestamista />
                <div className="min-h-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </>
        );
    }

    async function eliminarOfertaPrestamo(id) {
    try {
        const confirmar = confirm("¿Seguro que deseas eliminar esta oferta?");

        if (!confirmar) return;

        const response = await fetch(`https://localhost:7105/api/ofertaprestamo/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar la oferta");
        }

        alert("¡Oferta eliminada correctamente!");
        navigate("/prestamista/OfertasPrestamos");

    } catch (error) {
        console.error(error);
        alert("Hubo un error al eliminar la oferta");
    }
}

    return (
        <>
            <Slidebarprestamista />

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

                <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-xl h-80">
                    <h1 className="text-3xl font-bold mb-3 text-black">
                        Préstamo {oferta?.categoria} #{oferta?.ofertaPrestamoId}
                    </h1>

                    <p className="text-gray-600 mb-5">
                        Monto entre{" "}
                        <span className="font-bold">${oferta?.montoMin}</span> y
                        <span className="font-bold"> ${oferta?.montoMax}</span>
                    </p>

                    <div className="grid grid-cols-2 gap-6 text-gray-700">
                        <p><strong>Interés:</strong> {oferta?.interes}%</p>
                        <p><strong>Cuotas:</strong> {oferta?.cuotas}</p>
                        <p><strong>Frecuencia:</strong> {oferta?.frecuencia}</p>
                        <p><strong>Descripción:</strong> {oferta?.descripcion}</p>
                    </div>

                <div className="flex justify-center mt-10">
                    <button className="btn btn-error mt-6 text-white mx-2" disabled={!oferta?.disponible}
                    onClick={() => {eliminarOfertaPrestamo(oferta.ofertaPrestamoId)}}
                    >Eliminar</button>
                    <button className="btn btn-success mt-6 text-white mx-2" disabled={!oferta?.disponible} onClick={() => navigate(`/Prestamista/EditarOferta/${oferta.ofertaPrestamoId}`)}>Actualizar</button>
                </div>
                </div>
            </div>
        </>
    );
}

export default PrestamistaDetalleOferta;
