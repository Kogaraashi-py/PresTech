import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slidebarprestamista from "../../components/slidebarprestamista";

function PrestamistaDetalleCliente() {
  const { prestatarioId } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const prestamistaId = localStorage.getItem("prestamistaId")

  const cargarDetalles = async () => {
    try {
      const res = await fetch(
        `https://localhost:7105/api/Prestamista/DetalleCliente/${prestatarioId}/${prestamistaId}`
      );

      if (!res.ok) throw new Error("No se pudo obtener el detalle");

      const data = await res.json();
      setDetalle(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDetalles();
  }, [prestatarioId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const obtenerSexo = (sexo) => {
  if (sexo === "M") return "Masculino";
  if (sexo === "F") return "Femenino";
  return "No especificado";
};

 function contactar(prestatario) {
    const telefono = detalle.telefono;
    const fecha = new Date(prestatario.fechaProxPago).toLocaleDateString("es-CO");
    const nombre = detalle.nombre;

    const mensaje = `Hola ${nombre}, tu próxima fecha de pago es el día ${fecha}. no se te olvide de realizar tu pago a tiempo. ¡Gracias!`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  }

  return (
    <>
  <Slidebarprestamista />

  <div className="bg-linear-to-tl from-gray-300 to-gray-100 min-h-screen text-black p-10">
    <button onClick={() => navigate(-1)} className="btn btn-outline btn-error px-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
        </svg>
        Regresar</button>
    <div className="flex gap-10 justify-center items-start">
      <div className="space-y-6 w-full max-w-md">
        <div className="p-6 rounded-xl py-5">
          <h1 className="text-4xl font-bold">{detalle.nombre}</h1>

          <div className="flex flex-row my-2 text-gray-500">
            <p className="basis-36">{detalle.email}</p>
            <p className="basis-7">•</p>
            <p>{detalle.telefono}</p>
          </div>

        </div>

        <div className="bg-white/60 rounded-xl p-5">
          <h2 className="text-xl font-bold mb-5">Resumen Financiero</h2>

          <div className="card bg-white shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title text-slate-500">Saldo Total</h2>
              <p className="text-lg font-bold">${detalle.totalSaldo}</p>
            </div>
          </div>

          <div className="card bg-white shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title text-slate-500">Saldo Total Restante</h2>
              <p className="text-lg font-bold">${detalle.totalSaldoRestante}</p>
            </div>
          </div>

          <div className="card bg-white shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-slate-500">Préstamos Activos</h2>
              <p className="text-lg font-bold">{detalle.cantidadPrestamosActivos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 rounded-xl p-5">
          <h2 className="text-xl font-bold mb-5">Información Personal</h2>

          <p className="text-slate-500">Identificación</p>
          <p className="font-bold">{detalle.identificacion}</p>
          <div className="divider divider-neutral"></div>

          <p className="text-slate-500">Correo Electrónico</p>
          <p className="font-bold">{detalle.email}</p>
          <div className="divider divider-neutral"></div>

          <p className="text-slate-500">Teléfono</p>
          <p className="font-bold">{detalle.telefono}</p>
          <div className="divider divider-neutral"></div>

          <p className="text-slate-500">Sexo</p>
          <p className="font-bold">{obtenerSexo(detalle.sexo)}</p>
          <div className="divider divider-neutral"></div>

          <p className="text-slate-500">Ciudad</p>
          <p className="font-bold">{detalle.ciudad}</p>
        </div>

      </div>

      <div className="w-full max-w-lg my-40">

        <div className="bg-white shadow-xl rounded-xl p-6 ">
          {detalle.prestamos.map((p) => (
            <div key={p.prestamoId} className="border p-4 rounded mb-4 border-gray-300">
              <p className="font-bold text-xl mb-5">Préstamo {p.categoria} #{p.ofertaPrestamoId}</p>
              <p className="mb-2"><strong>Saldo: </strong>${p.saldoPrestamo}</p>
              <p className="mb-2"><strong>Restante: </strong>${p.saldoRestante}</p>
              <p className="mb-2"><strong>Estado: </strong>{p.estado}</p>
              <p className="mb-2"><strong>Fecha inicio: </strong>{new Date(p.fechaInicio).toLocaleDateString("es-CO")}</p>
              <p className="mb-2"><strong>Fecha proximo pago: </strong>{new Date(p.fechaProxPago).toLocaleDateString("es-CO")}</p>
              <button className="btn btn-primary mt-5" onClick={() => navigate(`/prestamista/prestamos/${p.prestamoId}`)}>Ver prestamo</button>
              <button className="btn btn-outline btn-success mt-5 mx-5" onClick={() => contactar(p)}>Mandar recordatorio via WhatsApp</button>
            </div>
          ))}
        </div>

      </div>

    </div>
  </div>
</>
  );
}

export default PrestamistaDetalleCliente;
