import * as fs from 'fs';
import * as path from 'path';

const configPath = path.join('config', 'settings.json');

if (fs.existsSync(configPath)) {
  const raw = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(raw);
  console.log('Конфігурація завантажена:', config);
} else {
  console.warn('Файл конфігурації не знайдено.');
}
