# Design Patterns

## Прекурс

- [Тема 0. Вступ до Node.js та роботи з файлами](./Topic_00_Base_NodeJS/) — Робота з файлами, JSON, CSV, XML у Node.js (TypeScript)

---

## Тиждень 1. Основи ООП та SOLID

- [Тема 1. Основи об'єктно-орієнтованого програмування](./Topic_01_Base_OOP/) — Інкапсуляція, наслідування, поліморфізм, абстракція, асоціації, DI
- [Тема 2. Принципи проєктування SOLID](./Topic_02_SOLID_Design_Principles/) — SRP, OCP, LSP, ISP, DIP, антипатерни

---

## Тиждень 2. Породжувальні патерни

- [Тема 3. Фабрика й Абстрактна фабрика](./Topic_03_Factory_Method/) — Factory Method, Abstract Factory, параметризовані фабрики
- [Тема 4. Одинак, Будівельник та Прототип](./Topic_04_Singleton_Builder_Prototype/) — Singleton (різні варіанти), Builder, Prototype (shallow/deep copy)

---

## Тиждень 3. Структурні патерни

- [Тема 5. Адаптер та Фасад](./Topic_05_Facade_Adapter/) — Facade, Adapter (object/class/functional), антипатерни
- [Тема 6. Декоратор та Замісник](./Topic_06_Decorator_Proxy/) — Decorator (class/property/method/getter), Proxy (ручний, ES6), комбінування

---

## Тиждень 4. Структурні та поведінкові патерни

- [Тема 7. Компонувальник та Міст](./Topic_07_Bridge_Composite/) — Bridge (OOP/функціональний), Composite (ручний, інтерфейсний, DOM)
- [Тема 8. Спостерігач](./Topic_08_Observer/) — Observer (push/pull, async, групи, типізовані події, MVC, Event Bus)

---

## Тиждень 5. Поведінкові патерни

- [Тема 9. Ітератор та Шаблонний метод](./Topic_09_Iterator_Template-Method/) — Iterator (ручний, класичний, генератор, iterable), Template Method (базовий, абстрактний, hook-методи)
- [Тема 10. Команда](./Topic_10_Command/) — Command (базовий, undo, macro, bus, observer, async, generic)

---

## Тиждень 6. Поведінкові патерни

- [Тема 11. Ланцюжок відповідальностей та Посередник](./Topic_11_CoR_Mediator/) — Chain of Responsibility (класичний, дерево, middleware, dispatcher), Mediator (ручний, інтерфейс, підсистеми)
- [Тема 12. Стан та Стратегія](./Topic_12_State_Strategy/) — State (ручний, інтерфейс), Strategy (ручний, інтерфейс)

---

## Інструкція з запуску TypeScript-прикладів

1. Встанови залежності (один раз у корені або в потрібній темі):
   ```bash
   npm install
   ```
2. Запуск напряму через ts-node:
   ```bash
   npx ts-node ІМʼЯ_ФАЙЛУ.ts
   ```
3. Або спочатку скомпілюй у JS, потім запускай через node:
   ```bash
   npx tsc
   node dist/ІМʼЯ_ФАЙЛУ.js
   ```

---

- Для запуску прикладів з DOM (де є document/window) потрібен браузер або jsdom.
- Для роботи з XML потрібен пакет fast-xml-parser (див. work_xml.ts у Тема 0).
