export function validateVehicleData(values) {
  const errors = {};

  if (!values.licensePlate) {
    errors.licensePlate = "La placa es requerida";
  } else if (values.licensePlate.length < 3 || values.licensePlate.length > 10) {
    errors.licensePlate = "La placa debe tener entre 3 y 10 caracteres";
  }

  if (!values.brand) {
    errors.brand = "La marca es requerida";
  }

  if (!values.model) {
    errors.model = "El modelo es requerido";
  }

  return errors;
}