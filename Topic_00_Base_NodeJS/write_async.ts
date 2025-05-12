import * as fs from "fs/promises";
import * as path from "path";

(async () => {
  await fs.mkdir("output", { recursive: true });
  const outputPath = path.join("output", "log.txt");
  const text = "Асинхронне збереження від " + new Date().toISOString();

  await fs.writeFile(outputPath, text, "utf-8");
})();
