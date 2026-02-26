# Бэкенд каталога оборудования (FastAPI)

## Запуск

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API будет доступен по адресу: **http://127.0.0.1:8000**

- Список категорий: `GET /api/equipment/categories`
- Список товаров: `GET /api/equipment` (опционально `?category=filtration`)
- Один товар: `GET /api/equipment/{id}` (например `/api/equipment/sand-filter`)
- Проверка: `GET /api/health`

## Данные

Товары загружаются из файла **`backend/data/equipment.json`**.

### Синхронизация из основного каталога

Если вы по-прежнему правите `data/equipment-products.js`, обновить JSON для бэкенда:

```bash
# из корня проекта (kalipso_web)
node backend/scripts/sync-to-json.js
```

После этого перезапустите uvicorn (или дождитесь перезагрузки при `--reload`), чтобы подхватить новые данные.

## Админка

Страница **`admin-equipment.html`** в корне проекта — добавление и редактирование товаров через API:

- Откройте в браузере (при запущенном бэкенде).
- Укажите URL API (по умолчанию `http://127.0.0.1:8000`), нажмите «Обновить список».
- **Добавить товар** — форма с полями: id, категория, название, цена, изображение, описание, особенности, блок «Стоимость», CTA.
- В таблице: **Изменить** / **Удалить**.

Товары с полной структурой (несколько блоков текста и карточек — поле `blocks`) лучше править в `backend/data/equipment.json` вручную или через API с телом запроса из скрипта/Postman.

## Фронт

В `equipment-catalog.html` и `equipment-product.html` можно указать базовый URL API (например `http://127.0.0.1:8000`). Если API недоступен, подставляются данные из `data/equipment-products.js` (fallback).
