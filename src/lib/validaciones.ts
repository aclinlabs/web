/**
 * Validacion de apellidos del formulario de cotizacion.
 *
 * Con RUT chileno se exigen ambos apellidos (paterno y materno). Con pasaporte
 * basta uno, porque muchos pacientes extranjeros tienen un solo apellido.
 *
 * Cuenta como apellido cada palabra con al menos dos letras, asi "Pérez S." no
 * pasa como dos apellidos pero "de la Fuente González" si. Se usa en el
 * formulario y en la API, para que no se pueda saltar desde el navegador.
 */

function contarApellidos(valor: string): number {
  return valor
    .trim()
    .split(/\s+/)
    .filter((palabra) => (palabra.match(/\p{L}/gu) ?? []).length >= 2).length;
}

/** RUT chileno con digito verificador correcto (acepta puntos, guion y espacios). */
export function esRutValido(valor: string): boolean {
  const limpio = valor.replace(/[.\s-]/g, "").toUpperCase();
  const m = limpio.match(/^(\d{7,8})([\dK])$/);
  if (!m) return false;

  let suma = 0;
  let factor = 2;
  for (let i = m[1].length - 1; i >= 0; i--) {
    suma += Number(m[1][i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resto = 11 - (suma % 11);
  const dv = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return dv === m[2];
}

/** Devuelve el mensaje de error, o "" si los apellidos son suficientes. */
export function errorApellidos(apellidos: string, documento: string): string {
  const n = contarApellidos(apellidos);
  if (esRutValido(documento)) {
    return n >= 2 ? "" : "Ingrese ambos apellidos del paciente (paterno y materno).";
  }
  return n >= 1 ? "" : "Ingrese el apellido del paciente.";
}
