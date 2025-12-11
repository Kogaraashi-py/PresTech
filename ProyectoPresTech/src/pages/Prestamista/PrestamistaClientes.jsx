import Slidebarprestamista from "../../components/slidebarprestamista";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PrestamistaClientes() {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const prestamistaId = localStorage.getItem("prestamistaId");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch(
          `https://localhost:7105/api/Prestamista/${prestamistaId}/Clientes`
        );

        if (!res.ok) throw new Error("Error obteniendo los clientes");

        const data = await res.json();
        setClientes(data);
        setFilteredClientes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    const filtro = clientes.filter((c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.telefono.includes(search)
    );

    setFilteredClientes(filtro);
  }, [search, clientes]);

  const limpiarFiltro = () => {
    setSearch("");
  };

  return (
    <>
      <Slidebarprestamista />

      <div className="space-y-6 bg-linear-to-tl from-gray-300 to-gray-100 to-50% text-black min-h-screen">
        <div className="lg:mx-50">
          <h1 className="text-5xl font-bold text-foreground mb-5 pt-10">
            Clientes
          </h1>
          <p className="text-muted-foreground">
            Gestiona la información de tus prestatarios
          </p>
        </div>

        <div className="space-y-6 rounded-2xl lg:mx-50 py-10 bg-white text-black shadow-md">
          <div className="flex items-center justify-star">
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="input input-info mx-1 lg:ml-10 px-5 bg-white text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline btn-info lg:mx-1 lg:px-6"
              onClick={limpiarFiltro}
            >
              Limpiar
            </button>
          </div>

          <div className="lg:mx-10 space-y-4">
            {filteredClientes.map((cliente) => (
              <div
                key={cliente.prestatarioId}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors border-gray-200 bg-white text-black shadow-sm"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cliente.nombre}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <p>{cliente.email}</p>
                    <p>{cliente.telefono}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">
                      {cliente.cantidadPrestamosActivos} préstamos activos
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${cliente.totalSaldoRestante}
                    </p>
                  </div>
                  <button className="btn btn-outline btn-accent" onClick={() => navigate(`/prestamista/cliente/${cliente.prestatarioId}`)}>
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrestamistaClientes;
