KALIPSO demo prototype

Как показать клиенту:
1) Откройте index.html в браузере (можно локально).
2) Для подстановки данных используйте параметры:
   index.html?city=Belgrade&phone=%2B381-xx-xxx&tg=kalipso_demo
   prefill ветка квиза: ?prefill=pool или ?prefill=spa

Для переноса в Tilda:
- Сайдбар: Zero Block + фиксация (Position and Overflow -> Fixed).
- Квиз: Quiz Form + visibility conditions (branching) + Success URL на /thanks.
- Кастомный код: T123 Embed HTML (CSS/JS).
