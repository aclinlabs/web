import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  // Admin user
  const hashed = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@aclin.cl" },
    update: {},
    create: {
      email: "admin@aclin.cl",
      password: hashed,
      name: "Administrador",
      role: "admin",
    },
  });

  // Seed sucursales
  const sucursales = [
    {
      nombre: "Sucursal 6 Norte",
      direccion: "1 Oriente #458",
      ciudad: "Viña del Mar",
      email: "1oriente@aclin.cl",
      lat: -33.02448,
      lng: -71.55149,
      horarioClinica:
        "🧪 Horario de atención clínica\n(Toma y recepción de muestras)\nLunes a viernes: 7:45 a 12:45 hrs.\nSábados: 8:30 a 10:30 hrs.",
      horarioAdmin:
        "📋 Horario de atención administrativa\n(Entrega de resultados, venta de bonos, presupuestos, etc.)\nLunes a Jueves: 7:45 a 16:30 hrs.\nViernes: 7:45 a 16:00 hrs.\nSábado: 8:30 a 11:00 hrs.",
      activa: true,
      orden: 1,
    },
    {
      nombre: "Casa Matriz",
      direccion: "9 Norte #795",
      ciudad: "Viña del Mar",
      email: "consultas@aclin.cl",
      telefono: "32 33 23 600",
      lat: -33.01504,
      lng: -71.55001,
      horarioClinica:
        "🧪 Horario de atención clínica\nLunes a viernes: 7:30 a 13:00 hrs.\nSábados: 8:00 a 11:00 hrs.",
      horarioAdmin:
        "📋 Horario de atención administrativa\nLunes a Viernes: 7:30 a 17:00 hrs.\nSábado: 8:00 a 12:00 hrs.",
      activa: true,
      orden: 0,
    },
  ];

  for (const s of sucursales) {
    await prisma.sucursal.create({ data: s });
  }

  // Popup
  await prisma.popup.create({
    data: {
      titulo: "¡Bienvenido a Aclin!",
      contenido:
        "Laboratorio clínico con más de 37 años de experiencia. Agenda tu examen hoy.",
      activo: false,
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
