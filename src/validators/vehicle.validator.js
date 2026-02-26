export function validateVehicle(values) {
  const v = values || {};
  const errors = {};

  const brand = (v.brand || "").trim();
  const model = (v.model || "").trim();
  const plate = (v.plate || "").trim().toUpperCase();

  if (!brand) errors.brand = "La marca es obligatoria.";
  if (!model) errors.model = "El modelo es obligatorio.";
  if (!plate) errors.plate = "La placa es obligatoria.";
  if (plate && !/^[A-Z0-9-]{5,10}$/.test(plate)) {
    errors.plate = "Formato de placa inválido (ej: ABC-1234).";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    normalized: { brand, model, plate },
  };
}