/**
 * Mapeo examen → instructivo de toma de muestras.
 *
 * Los PDF viven en public/instructivos/ y se generan desde los .docx de
 * "instructivos examenes aclin" (fuente editable, no versionada).
 */

export interface ExamenParaInstructivo {
  nombre: string;
  preparacion?: string | null;
  muestra?: string | null;
}

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // varios nombres traen espacios duros (U+00A0) pegados desde Excel/Word
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export const INSTRUCTIVOS_DIR = "/instructivos";

/** Documento de instructivo. `variante` sólo se usa cuando hay uno por sexo. */
export interface Instructivo {
  archivo: string;
  variante?: "mujer" | "hombre";
}

const doc = (archivo: string, variante?: "mujer" | "hombre"): Instructivo => ({ archivo, variante });

// Instructivos por sexo: se ofrecen los dos cuando el examen no distingue.
const ORINA_COMPLETA = [
  doc("orina-completa-sedimento-mujer", "mujer"),
  doc("orina-completa-sedimento-urocultivo-hombre", "hombre"),
];
const UROCULTIVO = [
  doc("urocultivo-mujer", "mujer"),
  doc("orina-completa-sedimento-urocultivo-hombre", "hombre"),
];
const ITS_MICROBIOLOGIA = [
  doc("its-microbiologia-mujeres", "mujer"),
  doc("its-microbiologia-hombres", "hombre"),
];
const ITS_PCR = [
  doc("its-pcr-mujeres", "mujer"),
  doc("its-pcr-hombres", "hombre"),
];

// Exámenes que el instructivo de deposición fresca declara cubrir. Si un examen
// de deposición no está aquí, no se muestra link: es preferible no mostrar
// instructivo a mostrar el equivocado.
const DEPOSICION_FRESCA = [
  "leucocitos fecales",
  "rotavirus",
  "adenovirus",
  "norovirus",
  "coronavirus",
  "ph en deposicion",
  "azucares reductores",
  "grasa neutra",
  "grasas neutras",
  "sudan",
  "esteatocrito",
  "clostridium",
  "helicobacter",
  "calprotectina",
  "elastasa",
  "panel bacteriano",
  "panel viral",
  "panel gastrointestinal",
];

/**
 * Devuelve los instructivos que corresponden a un examen.
 *
 * Regla de oro: si no hay un instructivo que cubra explícitamente el examen,
 * devuelve lista vacía y no se muestra ningún link. Nunca se cae a un
 * instructivo genérico "por si acaso" — un instructivo equivocado hace que la
 * muestra se rechace.
 */
export function resolveInstructivos(examen: ExamenParaInstructivo): Instructivo[] {
  const nombre = normalizar(examen.nombre || "");
  const prep = normalizar(examen.preparacion || "");
  const muestra = normalizar(examen.muestra || "");
  const texto = `${nombre} ${prep}`;

  // --- Tests con nombre propio: mandan por sobre el tipo de muestra ---
  if (texto.includes("clonidina")) return [doc("test-clonidina")];
  if (texto.includes("post acth") || texto.includes("synacthen")) return [doc("test-synacthen-acth")];
  if (texto.includes("lh-rh") || texto.includes("lupron")) return [doc("test-lhrh-lupron")];
  if (texto.includes("liddle debil")) return [doc("test-liddle-debil")];
  if (texto.includes("liddle fuerte")) return [doc("test-liddle-fuerte")];
  if (texto.includes("tyrrell") || texto.includes("tyrell")) return [doc("test-tyrrell")];
  if (texto.includes("nugent")) return [doc("test-nugent")];
  if (texto.includes("graham")) return [doc("test-graham")];
  if (texto.includes("acarotest") || texto.includes("raspado de piel")) return [doc("acarotest")];
  if (texto.includes("caroteno") && texto.includes("sobrecarga")) return [doc("caroteno-sobrecarga")];
  if (texto.includes("sudor") || texto.includes("iontoforesis")) return [doc("electrolitos-en-sudor")];
  if (texto.includes("post carga") || texto.includes("curva de tolerancia") || texto.includes("curva de insulina") || texto.includes("post ingesta de glucosa") || texto.includes("post glucosa")) {
    return [doc("post-carga-glucosa")];
  }
  if (texto.includes("post prandial") || texto.includes("postprandial")) return [doc("glicemia-insulina-pre-post-prandial")];
  if (texto.includes("inmunodeficiencia humana") || /\bvih\b/.test(texto)) return [doc("vih")];

  // --- Por tipo de muestra ---
  if (muestra.includes("deposicion") || muestra.includes("perianal")) {
    if (texto.includes("coprocultivo") || texto.includes("campylobacter") || texto.includes("yersinia") || texto.includes("vibrio")) {
      return [doc("coprocultivo")];
    }
    if (texto.includes("coproparasitologico") || texto.includes("parasitologico seriado")) return [doc("coproparasitologico-seriado")];
    if (texto.includes("hemoglobina humana en deposicion")) return [doc("hemoglobina-humana-deposicion")];
    if (texto.includes("hemorragias ocultas") || texto.includes("sangre oculta")) return [doc("sangre-oculta-deposiciones")];
    if (texto.includes("estreptococ")) return [doc("estreptococo-grupo-b")];
    if (DEPOSICION_FRESCA.some((k) => texto.includes(k))) return [doc("deposicion-fresca")];
    return [];
  }

  if (muestra.includes("saliva")) {
    if (texto.includes("cortisol")) return [doc("saliva-cortisol-salivette")];
    if (texto.includes("iga")) return [doc("saliva-iga-secretora")];
    return [];
  }

  if (muestra.includes("expectoracion") || texto.includes("expectoracion") || texto.includes("desgarro")) {
    return [doc("expectoracion-desgarro")];
  }
  if (texto.includes("semen") || texto.includes("espermiograma")) return [doc("semen")];

  if (muestra.includes("orina")) {
    if (texto.includes("droga")) return [doc("drogas-en-orina")];
    if (texto.includes("hidroxindol") || texto.includes("hiaa")) return [doc("orina-24-horas-hiaa")];
    if (texto.includes("citrato") || texto.includes("oxalato")) return [doc("orina-24-horas-citrato-oxalato")];
    if (/24\s*h/.test(texto) || /12\s*h/.test(texto)) return [doc("orina-24-horas")];
    if (texto.includes("urocultivo")) return UROCULTIVO;
    if (texto.includes("chlamydia") || texto.includes("clamidia") || texto.includes("gonococo") || texto.includes("neisseria") || texto.includes("mycoplasma") || texto.includes("ureaplasma")) {
      return ITS_MICROBIOLOGIA;
    }
    if (texto.includes("orina completa") || texto.includes("sedimento") || texto.includes("miccion") || texto.includes("espontanea")) {
      return ORINA_COMPLETA;
    }
    return [];
  }

  if (muestra.includes("secrecion") || muestra.includes("vaginal") || muestra.includes("uretral") || muestra.includes("faring") || muestra.includes("nasal")) {
    if (texto.includes("flujo vaginal")) return [doc("flujo-vaginal")];
    if (texto.includes("estreptococ") && (texto.includes("grupo b") || texto.includes("agalactiae"))) return [doc("estreptococo-grupo-b")];
    if (texto.includes("estreptococ")) return [doc("estreptococo-grupo-a-test-rapido")];
    if (texto.includes("por pcr") || texto.includes("panel")) return ITS_PCR;
    if (texto.includes("chlamydia") || texto.includes("clamidia") || texto.includes("gonococo") || texto.includes("neisseria") || texto.includes("mycoplasma") || texto.includes("ureaplasma")) {
      return ITS_MICROBIOLOGIA;
    }
    if (texto.includes("hisopado") || texto.includes("nasofaring") || texto.includes("orofaring") || texto.includes("influenza") || texto.includes("sincicial") || texto.includes("covid")) {
      return [doc("hisopado-nasofaringeo-orofaringeo")];
    }
    return [];
  }

  if (muestra.includes("sangre")) {
    if (texto.includes("niveles plasm") || texto.includes("niveles plasmaticos")) return [doc("niveles-plasmaticos-farmacos")];
    if (texto.includes("1 oriente #841") || texto.includes("1 oriente 841")) return [doc("sangre-solo-1-oriente-841")];
    if (texto.includes("solo en algunas sucursales") || texto.includes("sólo en algunas sucursales")) return [doc("sangre-horario-especial")];
    return [doc("sangre-general")];
  }

  return [];
}
