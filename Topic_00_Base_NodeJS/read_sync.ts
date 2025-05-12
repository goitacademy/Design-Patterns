import * as fs from 'fs';
import * as path from 'path';

const dataFolder ='output';

if (fs.existsSync(dataFolder)) {
  const files = fs.readdirSync(dataFolder);

  for (const file of files) {
    const fullPath = path.join(dataFolder, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    console.log(`Файл ${file} містить ${content.length} символів`);
  }
}