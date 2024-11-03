// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from "fs";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from "path";
import sharp from "sharp";

import type { NextApiRequest, NextApiResponse } from "next";
import { UniBandConfig } from "@/config";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const galleryDir = path.join(process.cwd(), "public", UniBandConfig.galleryPath);

  try {
    const files = fs.readdirSync(galleryDir).filter((file) => {
      return /\.(jpg|jpeg|png|gif)$/i.test(file); // Filters for image files
    });

    const filesWithDimensions = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(galleryDir, file);
        const { width, height } = await sharp(filePath).metadata();
        return { path: file, width, height };
      })
    );

    res.status(200).json(filesWithDimensions);
  } catch (_error) {
    res.status(500).json({ error: "Failed to read gallery directory" });
  }
}
