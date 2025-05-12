import * as fs from "fs/promises";
import * as path from "path";

const configPath = path.join("data", "config.json");
const outputPath = path.join("data", "output.json");

(async () => {
  try {
    const rawInput = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(rawInput);

    const output = JSON.stringify(config, null, 2);
    await fs.writeFile(outputPath, output, "utf-8");
    console.log("Файл збережено:", outputPath);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.warn("Файл не знайдено:", configPath);
    } else {
      throw err;
    }
  }
})();
