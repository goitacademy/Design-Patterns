import * as fs from "fs/promises";
import * as path from "path";

const configPath = path.join("config", "settings.json");

(async () => {
  try {
    const raw = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(raw);
    console.log("Конфігурація:", config);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.warn("Файл не знайдено");
    } else {
      throw err;
    }
  }
})();
