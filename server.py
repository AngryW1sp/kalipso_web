"""
Сервер: статика + API заявок в Telegram.
Запуск: python run.py  (загружает .env и запускает uvicorn)
"""
import os
import json

from pathlib import Path
import urllib.request
import urllib.error

from starlette.applications import Starlette
from starlette.responses import JSONResponse, FileResponse, Response, RedirectResponse
from starlette.routing import Route, Mount
from starlette.staticfiles import StaticFiles
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

def _load_telegram_config():
    token = (os.environ.get("TELEGRAM_BOT_TOKEN") or "").strip()
    chat_id = (os.environ.get("TELEGRAM_CHAT_ID") or "").strip()
    if token and chat_id:
        return token, chat_id
    env_dir = Path(__file__).resolve().parent
    for p in [env_dir / ".env", Path.cwd() / ".env"]:
        if p.exists():
            try:
                for line in p.read_text(encoding="utf-8", errors="ignore").splitlines():
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, _, v = line.partition("=")
                        k, v = k.strip(), v.strip().strip("'\"")
                        if k == "TELEGRAM_BOT_TOKEN" and v:
                            token = v
                        elif k == "TELEGRAM_CHAT_ID" and v:
                            chat_id = v
            except Exception:
                pass
            if token and chat_id:
                break
    return token or "YOUR_BOT_TOKEN_HERE", chat_id or "YOUR_CHAT_ID_HERE"

BOT_TOKEN, CHAT_ID = _load_telegram_config()
if BOT_TOKEN and BOT_TOKEN != "YOUR_BOT_TOKEN_HERE" and CHAT_ID:
    print("[server] Telegram бот настроен")


async def send_lead(request):
    if request.method != "POST":
        return JSONResponse({"ok": False, "error": "Method not allowed"}, status_code=405)

    try:
        body = await request.json()
    except Exception:
        body = {}

    phone = (body.get("phone") or "").strip()
    name = (body.get("name") or "").strip()
    message = (body.get("message") or "").strip()
    source = (body.get("source") or "").strip()

    if not phone:
        return JSONResponse({"ok": False, "error": "Укажите телефон"}, status_code=400)

    token, chat_id = BOT_TOKEN, CHAT_ID
    if not token or token == "YOUR_BOT_TOKEN_HERE" or not chat_id or chat_id == "YOUR_CHAT_ID_HERE":
        return JSONResponse({"ok": False, "error": "Бот не настроен. Укажите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env"}, status_code=500)

    text = "🔔 Новая заявка с сайта KALIPSO\n\n"
    text += "📞 Телефон: " + phone + "\n"
    if name:
        text += "👤 Имя: " + name + "\n"
    if message:
        text += "💬 Сообщение: " + message + "\n"
    if source:
        text += "📍 Страница: " + source + "\n"

    payload = {
        "chat_id": chat_id,
        "text": text,
        "disable_web_page_preview": True,
    }

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            if data.get("ok"):
                return JSONResponse({"ok": True})
    except urllib.error.HTTPError as e:
        err_body = e.read().decode() if e.fp else ""
        try:
            err_data = json.loads(err_body)
            err_msg = err_data.get("description", err_body)
        except Exception:
            err_msg = str(e)
        return JSONResponse({"ok": False, "error": err_msg}, status_code=500)
    except Exception as e:
        return JSONResponse({"ok": False, "error": str(e)}, status_code=500)

    return JSONResponse({"ok": False, "error": "Ошибка отправки"}, status_code=500)


CLEAN_URLS = {
    "/": "index.html",
    "/home": "index.html",
    "/catalog": "catalog.html",
    "/equipment": "equipment.html",
    "/equipment/catalog": "equipment-catalog.html",
    "/equipment/product": "equipment-product.html",
    "/pool/3x6": "product-3x6.html",
    "/pool/product": "pool-product.html",
    "/services": "services.html",
    "/about": "about.html",
    "/contacts": "contacts.html",
}


def _page(filename):
    async def handler(request):
        return FileResponse(BASE_DIR / filename)
    return handler


async def favicon(request):
    return Response(status_code=204)


REDIRECTS = {
    "/equipment/": "/equipment",
    "/equipment/equipment.html": "/equipment",
    "/equipment/equipment-catalog.html": "/equipment/catalog",
    "/equipment/equipment-product.html": "/equipment/product",
    "/catalog/catalog.html": "/catalog",
    "/catalog/pool-product.html": "/pool/product",
    "/pool/catalog.html": "/catalog",
    "/pool/catalog": "/catalog",
    "/pool/pool-product.html": "/pool/product",
    "/pool/product-3x6.html": "/pool/3x6",
    "/services/services.html": "/services",
    "/about/about.html": "/about",
    "/contacts/contacts.html": "/contacts",
    "/index.html": "/",
    "/home/home.html": "/home",
}


class RedirectWrongPathsMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            path = scope.get("path", "") or "/"
            if path in REDIRECTS:
                qs = scope.get("query_string", b"").decode()
                url = REDIRECTS[path] + ("?" + qs if qs else "")
                response = RedirectResponse(url, status_code=301)
                await response(scope, receive, send)
                return
        await self.app(scope, receive, send)


clean_routes = [Route(path, _page(f)) for path, f in CLEAN_URLS.items() if path != "/"]

app = Starlette(
    debug=False,
    middleware=[
        Middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"]),
        Middleware(RedirectWrongPathsMiddleware),
    ],
    routes=[
        Route("/api/send-lead", send_lead, methods=["POST"]),
        Route("/favicon.ico", favicon),
        Route("/", _page("index.html")),
        *clean_routes,
        Mount("/", app=StaticFiles(directory=str(BASE_DIR), html=True)),
    ],
)
