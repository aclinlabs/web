/**
 * Exige los dos apellidos del paciente (paterno y materno).
 *
 * Cuenta como apellido cada palabra con al menos dos letras, asi "Pérez S." o
 * una sola palabra no pasan, pero sí "de la Fuente González" o "Pérez y Soto".
 * Se usa en el formulario y en la API, para que no se pueda saltar desde el
 * navegador.
 */
export function tieneDosApellidos(valor: string): boolean {
  const apellidos = valor
    .trim()
    .split(/\s+/)
    .filter((palabra) => (palabra.match(/\p{L}/gu) ?? []).length >= 2);
  return apellidos.length >= 2;
}

export const MENSAJE_DOS_APELLIDOS = "Ingrese ambos apellidos del paciente (paterno y materno).";
