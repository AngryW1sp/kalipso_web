"""
Простой API каталога оборудования для KALIPSO.
Данные загружаются и сохраняются в backend/data/equipment.json.
"""
import json
from pathlib import Path
from copy import deepcopy

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

app = FastAPI(title="KALIPSO Equipment API", version="1.0")

# CORS — чтобы фронт с другого порта или статики мог дергать API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).resolve().parent / "data" / "equipment.json"
_data: dict | None = None


def load_data() -> dict:
    """Загружает categories и products из JSON. При первом запросе кешируем."""
    global _data
    if _data is not None:
        return _data
    if not DATA_FILE.exists():
        _data = {"categories": {}, "products": []}
        return _data
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            _data = json.load(f)
    except Exception:
        _data = {"categories": {}, "products": []}
    return _data


def invalidate_cache():
    """Сбрасывает кеш после записи."""
    global _data
    _data = None


def save_data(data: dict) -> None:
    """Сохраняет данные в JSON."""
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    invalidate_cache()


class ProductBody(BaseModel):
    """Тело запроса для создания/обновления товара. Все поля опциональны при PATCH."""
    id: str | None = None
    category: str | None = None
    title: str | None = None
    price: str | None = None
    image: str | None = None
    imageAlt: str | None = None
    specs: str | None = None
    description: list[str] | None = None
    features: list[dict[str, str]] | None = None
    blocks: list[dict[str, Any]] | None = None
    configName: str | None = None
    configPrice: str | None = None
    configLink: str | None = None
    disclaimer: str | None = None
    ctaTitle: str | None = None
    ctaSub: str | None = None


@app.get("/api/equipment/categories")
def get_categories():
    """Словарь категорий: slug -> название."""
    data = load_data()
    return data.get("categories", {})


@app.get("/api/equipment/all")
def get_all():
    """Категории и все товары одним запросом (удобно для каталога)."""
    data = load_data()
    return {"categories": data.get("categories", {}), "products": data.get("products", [])}


@app.get("/api/equipment")
def list_products(category: str | None = None):
    """
    Список всех товаров.
    Если передан category (filtration, heating, ...) — только товары этой категории.
    """
    data = load_data()
    products = data.get("products", [])
    if category:
        products = [p for p in products if p.get("category") == category]
    return {"products": products}


@app.get("/api/equipment/{product_id}")
def get_product(product_id: str):
    """Один товар по id (slug). В ответ добавлено поле categoryName для хлебных крошек."""
    data = load_data()
    categories = data.get("categories", {})
    for p in data.get("products", []):
        if p.get("id") == product_id:
            out = dict(p)
            out["categoryName"] = categories.get(p.get("category", ""), p.get("category", ""))
            return out
    raise HTTPException(status_code=404, detail="Товар не найден")


@app.post("/api/equipment")
def create_product(body: ProductBody):
    """Добавить товар. Обязательны: id, category, title, price."""
    if not body.id or not body.category or not body.title or body.price is None:
        raise HTTPException(status_code=400, detail="Нужны поля: id, category, title, price")
    data = load_data()
    products = data.get("products", [])
    if any(p.get("id") == body.id for p in products):
        raise HTTPException(status_code=400, detail="Товар с таким id уже есть")
    product = body.model_dump(exclude_none=True)
    products.append(product)
    data["products"] = products
    save_data(data)
    invalidate_cache()
    return product


@app.put("/api/equipment/{product_id}")
def update_product(product_id: str, body: ProductBody):
    """Обновить товар по id. Переданные поля заменяют текущие."""
    data = load_data()
    products = data.get("products", [])
    for i, p in enumerate(products):
        if p.get("id") == product_id:
            upd = body.model_dump(exclude_none=True)
            if "id" in upd and upd["id"] != product_id:
                if any(x.get("id") == upd["id"] for x in products if x.get("id") != product_id):
                    raise HTTPException(status_code=400, detail="Товар с таким id уже есть")
            products[i] = {**p, **upd}
            data["products"] = products
            save_data(data)
            return products[i]
    raise HTTPException(status_code=404, detail="Товар не найден")


@app.delete("/api/equipment/{product_id}")
def delete_product(product_id: str):
    """Удалить товар по id."""
    data = load_data()
    products = data.get("products", [])
    new_list = [p for p in products if p.get("id") != product_id]
    if len(new_list) == len(products):
        raise HTTPException(status_code=404, detail="Товар не найден")
    data["products"] = new_list
    save_data(data)
    return {"ok": True}


@app.get("/api/health")
def health():
    return {"status": "ok"}
