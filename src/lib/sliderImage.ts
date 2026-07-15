import sharp from "sharp";

export async function compressToWebp(buffer: Buffer, maxWidth: number) {
  return sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();
}
