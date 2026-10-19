-- El codigo deja de ser unico: en el listado oficial muchos examenes comparten
-- codigo (por ejemplo todas las IgE especificas usan 305029).
DROP INDEX IF EXISTS "Examen_codigo_key";

-- Lugar de toma de muestra e instructivos ([{ etiqueta, url }]) por examen.
ALTER TABLE "Examen" ADD COLUMN "lugarToma" TEXT;
ALTER TABLE "Examen" ADD COLUMN "instructivos" JSONB;
