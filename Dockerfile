FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY . .
EXPOSE 8000

ENV PYTHONUNBUFFERED=1

CMD ["gunicorn", "server:app", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
