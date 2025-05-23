# Приклади патернів Bridge, Composite

- `example01.ts` — Composite (ручна реалізація): групування примітивів (`Circle`, `Rectangle`) у групи (`GraphicGroup`), рекурсивне малювання та переміщення
- `example02.ts` — Composite (інтерфейсний підхід): всі графічні об'єкти реалізують інтерфейс `Graphic`, групи можуть містити інші групи або примітиви, універсальні методи `add`, `remove`, `getChild`
- `example03.ts` — Composite для DOM: рекурсивна обробка DOM-дерева, пошук елементів, підрахунок, масове додавання класу
- `example03.html` — HTML-демонстрація для прикладу з DOM-композицією
- `example04.ts` — Bridge (OOP): абстракція `MessageNotifier` і реалізації каналів (`EmailSender`, `SMSSender`, `PushSender`), різні типи повідомлень комбінуються з різними каналами
- `example05.ts` — Bridge (функціональний стиль): функції-форматувальники і функції-надсилання, створення нотифікаторів через композицію функцій
- `tsconfig.json` — Налаштування компілятора TypeScript для цієї директорії

---

Цей список допоможе студентам швидко знайти потрібний приклад по темі Bridge/Composite.
