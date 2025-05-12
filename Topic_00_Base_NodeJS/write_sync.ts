import * as fs from 'fs';
import * as path from 'path';

fs.mkdirSync('output', { recursive: true });
const outputPath = path.join('output', 'log.txt');
const text = 'Журнал запуску від ' + new Date().toISOString();

fs.writeFileSync(outputPath, text, 'utf-8');