#!/usr/bin/env python
"""Запуск сервера с загрузкой .env перед uvicorn."""
import os
import sys
from pathlib import Path

_env = Path(__file__).resolve().parent / ".env"
if _env.exists():
    for line in _env.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            k, v = k.strip(), v.strip().strip("'\"")
            if k and v and k not in os.environ:
                os.environ[k] = v

# Запуск uvicorn
import uvicorn
uvicorn.run("server:app", host="0.0.0.0", port=8000)
