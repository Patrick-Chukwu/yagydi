import fs from "node:fs";
import path from "node:path";

const logoPath = path.join(process.cwd(), "public", "brand", "yagydi-logo.png");

/**
 * Build-time / server check so a missing file renders a wordmark
 * instead of a broken next/image. Client components also fall back on error.
 */
export function logoFileExists(): boolean {
  try {
    return fs.existsSync(logoPath);
  } catch {
    return false;
  }
}
