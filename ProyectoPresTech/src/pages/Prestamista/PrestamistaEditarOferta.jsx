import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slidebarprestamista from "../../components/slidebarprestamista";

function PrestamistaEditarOferta() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        categoria: "",
        montoMin: "",
        montoMax: "",
        interes: "",
        cuotas: "",
        frecuencia: "",
        descripcion: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarOferta = async () => {
            try {
                const resp = await fetch(`https://localhost:7105/api/OfertaPrestamo/${id}`);
                const data = await resp.json();

                setForm({
                    categoria: data.categoria,
                    montoMin: data.montoMin,
                    montoMax: data.montoMax,
                    interes: data.interes,
                    cuotas: data.cuotas,
                    frecuencia: data.frecuencia,
                    descripcion: data.descripcion
                });

                setLoading(false);
            } catch (error) {
                console.error("Error al cargar la oferta:", error);
            }
        };

        cargarOferta();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (parseFloat(form.montoMin) > parseFloat(form.montoMax)) {
            alert("El monto mínimo no puede ser mayor al monto máximo");
            return;
        }

        try {
            const prestamistaId = localStorage.getItem("prestamistaId");

            const payload = {
                ofertaPrestamoId: Number(id),
                categoria: form.categoria,
                montoMin: parseFloat(form.montoMin),
                montoMax: parseFloat(form.montoMax),
                interes: parseFloat(form.interes),
                cuotas: parseInt(form.cuotas),
                frecuencia: form.frecuencia,
                descripcion: form.descripcion,
                prestamistaId: Number(prestamistaId)
            };

            const resp = await fetch(`https://localhost:7105/api/OfertaPrestamo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!resp.ok) {
                alert("Error al actualizar la oferta");
                return;
            }

            alert("Oferta actualizada correctamente");
            navigate("/Prestamista/Ofertasprestamos");

        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar la oferta");
        }
    };

    if (loading) return <p className="text-center mt-10">Cargando datos...</p>;

    return (
        <>
            <Slidebarprestamista />

            <div className="min-h-screen bg-linear-to-tl from-gray-300 to-gray-100 p-6">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Editar Oferta</h1>
                        <p className="text-gray-600">Modifica los datos de esta oferta de préstamo</p>
                    </header>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-6 bg-white rounded-2xl shadow-md p-6 md:grid-cols-2 text-gray-700"
                    >
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-medium">Categoría del Préstamo *</label>
                            <select
                                name="categoria"
                                value={form.categoria}
                                onChange={handleChange}
                                className="select select-bordered w-full md:w-96 bg-white border-gray-700/30"
                                required
                            >
                                <option value="personal">Personal</option>
                                <option value="vehicular">Vehicular</option>
                                <option value="hipotecario">Hipotecario</option>
                                <option value="empresarial">Empresarial</option>
                                <option value="educativo">Educativo</option>
                                <option value="microcredito">Microcrédito</option>
                                <option value="emergencia">Emergencia</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Montos de préstamo *</label>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    name="montoMin"
                                    value={form.montoMin}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-white border-gray-700/30"
                                    placeholder="Monto mínimo"
                                    required
                                />
                                <input
                                    type="number"
                                    name="montoMax"
                                    value={form.montoMax}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-white border-gray-700/30"
                                    placeholder="Monto máximo"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Tasa de interés anual (%) *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="interes"
                                value={form.interes}
                                onChange={handleChange}
                                className="input input-bordered w-full md:w-64 bg-white border-gray-700/30"
                                placeholder="Tasa de interés"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Número de cuotas *</label>
                            <input
                                type="number"
                                name="cuotas"
                                value={form.cuotas}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-white border-gray-700/30"
                                placeholder="Número de cuotas"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Frecuencia de pago *</label>
                            <select
                                name="frecuencia"
                                value={form.frecuencia}
                                onChange={handleChange}
                                className="select select-bordered w-full md:w-64 bg-white border-gray-700/30"
                                required
                            >
                                <option value="Semanal">Semanal</option>
                                <option value="Quincenal">Quincenal</option>
                                <option value="Mensual">Mensual</option>
                                <option value="Anual">Anual</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full bg-white border-gray-700/30"
                                placeholder="Descripción del préstamo"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3">
                            <button
                                type="button"
                                className="btn btn-secondary bg-red-400 hover:bg-red-700"
                                onClick={() => navigate("/Prestamista/Prestamos")}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-info bg-cyan-500 hover:bg-cyan-700 text-white"
                            >
                                Actualizar Oferta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default PrestamistaEditarOferta;
