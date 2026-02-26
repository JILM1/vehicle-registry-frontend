import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { vehiclesApi } from "../../services/vehicles.api";
import { validateVehicle } from "../../validators/vehicle.validator";

export default function VehicleFormPage({ mode }) {
  const nav = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";
  const title = useMemo(
    () => (isEdit ? "Editar vehículo" : "Registrar vehículo"),
    [isEdit]
  );

  const [values, setValues] = useState({ brand: "", model: "", plate: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit || !id) return;

    (async () => {
      setLoading(true);
      try {
        const v = await vehiclesApi.getById(id);
        setValues({
          brand: v.brand || "",
          model: v.model || "",
          plate: v.plate || "",
        });
      } catch (e) {
        window.alert(e?.message || "No se pudo cargar el vehículo");
        nav("/vehicles");
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, id, nav]);

  function onChange(field, val) {
    setValues((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const { ok, errors: vErrors, normalized } = validateVehicle(values);
    if (!ok) {
      setErrors(vErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        if (!id) throw new Error("Falta el id para editar");
        await vehiclesApi.update(id, normalized);
      } else {
        await vehiclesApi.create(normalized);
      }
      nav("/vehicles");
    } catch (e) {
      window.alert(e?.message || "Error guardando");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{title}</h2>
        <Link to="/vehicles">Volver</Link>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Marca
          <input
            value={values.brand}
            onChange={(e) => onChange("brand", e.target.value)}
            placeholder="Toyota"
          />
          {errors.brand && <div style={{ color: "crimson" }}>{errors.brand}</div>}
        </label>

        <label>
          Modelo
          <input
            value={values.model}
            onChange={(e) => onChange("model", e.target.value)}
            placeholder="Corolla"
          />
          {errors.model && <div style={{ color: "crimson" }}>{errors.model}</div>}
        </label>

        <label>
          Placa
          <input
            value={values.plate}
            onChange={(e) => onChange("plate", e.target.value)}
            placeholder="ABC-1234"
          />
          {errors.plate && <div style={{ color: "crimson" }}>{errors.plate}</div>}
        </label>

        <button disabled={loading} type="submit">
          {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Registrar"}
        </button>
      </form>
    </div>
  );
}