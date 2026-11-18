import fs from "node:fs";
import path from "node:path";

const heroVideoPath = path.join(process.cwd(), "public", "videos", "hero.mp4");

/** True only when public/videos/hero.mp4 is on disk. */
export function heroVideoExists(): boolean {
  try {
    return fs.existsSync(heroVideoPath);
  } catch {
    return false;
  }
}
