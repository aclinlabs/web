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

/**
 * Lo escrito tiene formato de RUT (guion o puntos) aunque el digito verificador
 * no calce. Se exige el formato porque un numero pelado de 9 digitos puede ser
 * un pasaporte (los venezolanos, por ejemplo) y no hay que marcarlo como RUT.
 */
export function pareceRut(valor: string): boolean {
  if (!/[.-]/.test(valor)) return false;
  return /^\d{7,8}[\dK]$/.test(valor.replace(/[.\s-]/g, "").toUpperCase());
}

/** Error del campo "Rut o Pasaporte", o "" si esta bien. */
export function errorDocumento(documento: string): string {
  return pareceRut(documento) && !esRutValido(documento)
    ? "El RUT no es válido. Revise el número y el dígito verificador."
    : "";
}

/** El documento se toma como pasaporte: no es un RUT ni lo parece. */
export function esPasaporte(documento: string): boolean {
  return documento.trim() !== "" && !esRutValido(documento) && !pareceRut(documento);
}

/** Devuelve el mensaje de error, o "" si los apellidos son suficientes. */
export function errorApellidos(apellidos: string, documento: string): string {
  const n = contarApellidos(apellidos);
  if (esRutValido(documento) || pareceRut(documento)) {
    return n >= 2 ? "" : "Ingrese ambos apellidos del paciente (paterno y materno).";
  }
  return n >= 1 ? "" : "Ingrese el apellido del paciente.";
}

/**
 * Fecha de nacimiento escrita como dd/mm/aaaa.
 *
 * Se usa un campo propio en vez de <input type="date"> porque ese lo muestra
 * cada navegador segun su idioma (en ingles sale mes/dia/año) y los pacientes
 * se confundian con el orden.
 */
export function formatearFecha(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/** Error de la fecha de nacimiento, o "" si esta bien. */
export function errorFechaNacimiento(valor: string): string {
  const m = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return valor.trim() === "" ? "" : "Escriba la fecha como día/mes/año, por ejemplo 16/11/1986.";

  const [dia, mes, anio] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const fecha = new Date(anio, mes - 1, dia);
  const existe =
    fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
  if (!existe) return "Esa fecha no existe. Revise el día y el mes.";

  const hoy = new Date();
  hoy.setHours(23, 59, 59, 999);
  if (fecha > hoy) return "La fecha de nacimiento no puede ser futura.";
  if (anio < 1900) return "Revise el año de nacimiento.";
  return "";
}
