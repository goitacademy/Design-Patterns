# Приклади патернів Singleton, Builder, Prototype

- `singleton_01.ts` — Класичний Singleton з лінивим створенням екземпляра (`AppConfig.getInstance()`), збереження конфігурації
- `singleton_02.ts` — Реалізація з ранньою ініціалізацією (екземпляр створюється одразу при завантаженні класу)
- `singleton_03.ts` — Модульний Singleton, експорт єдиного екземпляра, а не класу
- `builder_01.ts` — Простий Builder для створення профілю користувача через ланцюжок викликів (`UserProfileBuilder`)
- `builder_02.ts` — Builder з директором (`UserProfileDirector`), різні сценарії побудови профілю (базовий, приватний тощо)
- `prototype_01.ts` — Проблеми ручного копіювання складних об'єктів, втрата приватних полів, дублювання важких операцій
- `prototype_02.ts` — Класичний патерн Prototype, інтерфейс `Prototype`, клас `ConcretePrototype` з методом `clone()`
- `prototype_03.ts` — Прототип з глибоким клонуванням, клас `Shape` з методом `clone()`, копіювання складних полів
- `prototype_04.ts` — Демонстрація різниці між shallow copy та deep copy для об'єктів, використання `structuredClone`
