import * as fs from "fs/promises";
import * as path from "path";

const dataFolder = "output";

(async () => {
  try {
    const files = await fs.readdir(dataFolder);

    for (const file of files) {
      const fullPath = path.join(dataFolder, file);
      const content = await fs.readFile(fullPath, "utf-8");
      console.log(`Файл ${file}: довжина ${content.length}`);
    }
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.warn("Каталог не знайдено");
    } else {
      throw err;
    }
  }
})();
