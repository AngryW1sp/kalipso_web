# Развёртывание KALIPSO на сервере

## Вариант 1: VPS (Ubuntu/Debian)

### 1. Подготовка сервера

```bash
ssh user@your-server-ip
sudo apt update && sudo apt install -y python3 python3-pip python3-venv nginx
```

### 2. Клонирование и настройка

```bash
cd /var/www
sudo git clone https://github.com/YOUR_USER/kalipso_web.git
cd kalipso_web
```

### 3. Виртуальное окружение

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn  # для production
```

### 4. Переменные окружения

```bash
cp .env.example .env
nano .env
```

Заполните:
```
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=ваш_chat_id
```

### 5. systemd-сервис (автозапуск)

```bash
sudo nano /etc/systemd/system/kalipso.service
```

Вставьте (замените `user` и путь при необходимости):

```ini
[Unit]
Description=KALIPSO web server
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/kalipso_web
Environment="PATH=/var/www/kalipso_web/venv/bin"
ExecStart=/var/www/kalipso_web/venv/bin/gunicorn server:app -w 1 -k uvicorn.workers.UvicornWorker -b 127.0.0.1:8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable kalipso
sudo systemctl start kalipso
sudo systemctl status kalipso
```

### 6. Nginx (прокси, SSL, порт 80)

```bash
sudo nano /etc/nginx/sites-available/kalipso
```

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /var/www/kalipso_web;
    index index.html;

    location / {
        try_files $uri $uri/ @app;
    }

    location @app {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/kalipso /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Вариант 2: Только Python (без Nginx)

Если Nginx не нужен, можно слушать порт 80 напрямую:

```bash
# В kalipso.service измените ExecStart:
ExecStart=/var/www/kalipso_web/venv/bin/python run.py
# И в run.py укажите port=80 (или 8080 и пробросьте через firewall)
```

Или запуск вручную:
```bash
cd /var/www/kalipso_web
source venv/bin/activate
python run.py  # или: gunicorn server:app -k uvicorn.workers.UvicornWorker -b 0.0.0.0:80
```

---

## Вариант 3: Docker

Создайте `Dockerfile`:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY . .
EXPOSE 8000
CMD ["gunicorn", "server:app", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
```

```bash
docker build -t kalipso .
# Создайте .env на сервере с TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
docker run -d -p 80:8000 --env-file .env --name kalipso kalipso
```

---

## Обновление

```bash
cd /var/www/kalipso_web
git pull
source venv/bin/activate
pip install -r requirements.txt --upgrade
sudo systemctl restart kalipso
```
