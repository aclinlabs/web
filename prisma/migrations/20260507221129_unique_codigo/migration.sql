/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Examen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Examen_codigo_key" ON "Examen"("codigo");
