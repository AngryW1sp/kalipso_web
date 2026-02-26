/**
 * Синхронизация данных: читает data/equipment-products.js и пишет backend/data/equipment.json.
 * Запуск из корня проекта: node backend/scripts/sync-to-json.js
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '../..');
const jsPath = path.join(projectRoot, 'data', 'equipment-products.js');
const outPath = path.join(projectRoot, 'backend', 'data', 'equipment.json');

if (!fs.existsSync(jsPath)) {
  console.error('Не найден файл:', jsPath);
  process.exit(1);
}

const content = fs.readFileSync(jsPath, 'utf8');
const window = {};
try {
  eval(content);
} catch (e) {
  console.error('Ошибка при выполнении JS:', e.message);
  process.exit(1);
}

const data = {
  categories: window.EQUIPMENT_CATEGORIES || {},
  products: window.EQUIPMENT_PRODUCTS || []
};

const dir = path.dirname(outPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Синхронизировано:', outPath, '— товаров:', data.products.length);
