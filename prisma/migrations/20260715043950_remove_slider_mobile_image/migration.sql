/*
  Warnings:

  - You are about to drop the column `imagenMobile` on the `SliderImagen` table. All the data in the column will be lost.
  - You are about to drop the column `mimeTypeMobile` on the `SliderImagen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SliderImagen" DROP COLUMN "imagenMobile",
DROP COLUMN "mimeTypeMobile";
