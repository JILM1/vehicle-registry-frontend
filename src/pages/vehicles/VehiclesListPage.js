import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { vehiclesApi } from "../../services/vehicles.api";
import { set } from "zod";

export default function VehicleListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load () {
    setLoading(true);
    setError(null);
    try {
      setItems(await vehiclesApi.list());
    } catch (e) {
      setError(e?.message || "Error cargando vehículos");
    } finally {
      setLoading(false);
    }
  }

 async function onDelete(id) {
    const ok = window.confirm("¿Eliminar este vehículo?");
    if (!ok) return;

    try {
      await vehiclesApi.remove(id);
      setItems((prev) => prev.filter((v) => v._id !== id));
    } catch (e) {
      window.alert(e?.message || "No se pudo eliminar");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2>Vehículos</h2>
        <Link to="/vehicles/new">+ Registrar vehículo</Link>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <table width="100%" cellPadding={10} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th style={{ width: 180 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td>{v.brand}</td>
                <td>{v.model}</td>
                <td>{v.plate}</td>
                <td>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Link to={`/vehicles/${v._id}/edit`}>Editar</Link>
                    <button onClick={() => onDelete(v._id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan={4}>No hay vehículos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}