-- CreateTable
CREATE TABLE "Cotizacion" (
    "id" TEXT NOT NULL,
    "sucursal" TEXT,
    "prevision" TEXT NOT NULL,
    "adjuntos" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cotizacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cotizacion_createdAt_idx" ON "Cotizacion"("createdAt");
