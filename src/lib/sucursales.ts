/**
 * Lógica compartida para elegir qué sucursal mostrar al abrir una ciudad,
 * usada por la página /sucursales y por el bloque de sucursales del home.
 */

export interface SucursalPreferible {
  nombre: string;
  ciudad: string;
}

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Ciudades con más de una sucursal: palabra clave de la sucursal más nueva,
// que es la que se debe mostrar por defecto al abrir la ciudad.
const SUCURSAL_MAS_NUEVA_POR_CIUDAD: Record<string, string[]> = {
  "la calera": ["sicem"],
  quillota: ["blanco encalada"],
  quilpue: ["nueva"],
  renaca: ["barros arana"],
  "villa alemana": ["calle diaz", "diaz"],
  "vina del mar": ["9 norte", "matriz"],
};

export function elegirSucursalPreferida<T extends SucursalPreferible>(
  citySucursales: T[],
  ciudad: string,
): T {
  const keywords = SUCURSAL_MAS_NUEVA_POR_CIUDAD[normalizar(ciudad)];
  if (keywords) {
    const match = citySucursales.find((s) => keywords.some((k) => normalizar(s.nombre).includes(k)));
    if (match) return match;
  }
  return citySucursales[0];
}
