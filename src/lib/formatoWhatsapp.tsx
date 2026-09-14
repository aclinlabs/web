import type { ReactNode } from "react";

/**
 * Convierte el formato de WhatsApp a elementos de React.
 *
 * Los avisos se escriben en WhatsApp y se pegan tal cual en el admin, asi que
 * llegan con la notacion de alla: *negrita*, _cursiva_, ~tachado~ y listas que
 * empiezan con "* ". Sin esto los asteriscos se ven literales en el sitio.
 *
 * Se devuelven nodos de React (no HTML), asi que el texto del admin nunca se
 * interpreta como marcado: no hay riesgo de inyeccion.
 */

const ETIQUETA = { "*": "strong", _: "em", "~": "s" } as const;

type Delimitador = keyof typeof ETIQUETA;

// Un tramo con formato: delimitador, primer caracter visible, y sin
// delimitadores adentro (WhatsApp tampoco los anida).
const TRAMO = /([*_~])([^\s*_~][^*_~]*?)\1/g;

function formatearLinea(linea: string, clave: string): ReactNode[] {
  const nodos: ReactNode[] = [];
  let desde = 0;
  let n = 0;
  let m: RegExpExecArray | null;

  TRAMO.lastIndex = 0;
  while ((m = TRAMO.exec(linea)) !== null) {
    // "hasta las *" no es negrita: WhatsApp exige que el cierre venga pegado
    // al texto. Se deja el asterisco literal y se sigue buscando despues de el.
    if (/\s$/.test(m[2])) {
      nodos.push(linea.slice(desde, m.index + 1));
      desde = m.index + 1;
      TRAMO.lastIndex = desde;
      continue;
    }

    if (m.index > desde) nodos.push(linea.slice(desde, m.index));

    const Etiqueta = ETIQUETA[m[1] as Delimitador];
    nodos.push(<Etiqueta key={`${clave}-${n++}`}>{m[2]}</Etiqueta>);
    desde = m.index + m[0].length;
  }

  if (desde < linea.length) nodos.push(linea.slice(desde));
  return nodos;
}

export function formatearWhatsapp(texto: string): ReactNode[] {
  return texto.split("\n").map((linea, i) => {
    // Vinetas de WhatsApp: "* item" o "- item" al inicio de la linea.
    const vineta = linea.match(/^\s*[*-]\s+(.*)$/);
    const contenido = vineta ? vineta[1] : linea;

    return (
      <span key={`l${i}`}>
        {i > 0 && "\n"}
        {vineta && "• "}
        {formatearLinea(contenido, `l${i}`)}
      </span>
    );
  });
}
