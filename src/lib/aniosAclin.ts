/**
 * Años de trayectoria de Aclin, calculados desde su fundacion (septiembre de
 * 1987) para que el numero se actualice solo cada aniversario y no quede
 * desactualizado en el sitio: 39 en octubre de 2026, 40 desde septiembre de 2027.
 */
const FUNDACION = { anio: 1987, mes: 9 };

export function aniosDeExperiencia(hoy = new Date()): number {
  const cumplioEsteAnio = hoy.getMonth() + 1 >= FUNDACION.mes;
  return hoy.getFullYear() - FUNDACION.anio - (cumplioEsteAnio ? 0 : 1);
}
