import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const p = new PrismaClient({ adapter } as any);

async function main() {
  const nombres = [
    "Ácido Hidroxindolacético 5  en orina (HIAA)",
    "Acido Vainillilmandélico, Cuantitativo (Orina)",
    "Alfa -1- Antitripsina Cuantitativa",
    "Apolipoproteínas A-1",
    "Apolipoproteínas B",
    "Bordetella Pertussis IgG",
    "Bordetella Pertussis IgM",
    "Cálculo Urinario",
    "Carga viral VIH",
    "Catecolaminas Plasmáticas",
    "Catecolaminas Urinarias",
    "Ceruloplasmina",
    "Cetoesteroides 17 en orina",
    "Cisticercos anticuerpos IgG",
    "Citrato en Orina 24 Hrs.",
    "Cobre (Cupremia) en sangre",
    "Cobre en orina o Cupruria",
    "Cocaína en orina",
    "Complemento C1Q",
    "Drogas traige",
    "Electroforesis de Hemoglobina",
    "Electroforesis de Proteínas (EFP) (Sangre)",
    "Electroforesis de proteínas en orina",
    "Gastrina o gastrinemia",
    "Gota Gruesa",
    "Gusanos macroscópicos, Identificación",
    "Hidatidosis, anticuerpos IgG",
    "Hidroxicorticoesteroides 17 (Orina)",
    "IGFBP1 (Insulin Like Growth Factor Binding Protein)",
    "Inmunofijación (x) 5 (Orina)",
    "Inmunofijación (x) 5 (Sangre)",
    "Inmunoglobulina IgG Específica",
    "marihuana en orina",
    "Metanefrinas urinarias (incluye determinación de Metanefrina)",
    "Niveles Plasmaticos de Droga (Clonazepam – Ravotril)",
    "Oxalato en Orina 24 Hrs.",
    "Parvovirus B19 IgG",
    "Parvovirus B19 IgM",
    "Resistencia Globular Osmótica",
    "Salicilemia Cuantitativa",
    "Triquinosis, anticuerpos IgG",
    "VIH (HIV) 4ª Generación (Ac + Ag P-24)",
    "Virus Hepatitis B, Anticuerpo del  Antígeno E",
    "Virus Hepatitis B, Antígeno E (HBE AG)",
    "Virus Hepatitis E, Anti Virus (Anti VHE IgG)",
    "Virus Hepatitis E, Anticuerpos de  (anti VHE)",
  ];
  const r = await p.resultadoSucursal.createMany({
    data: nombres.map((nombre, i) => ({ nombre, orden: i })),
  });
  console.log("Insertados:", r.count);
}

main().finally(() => p.$disconnect());
