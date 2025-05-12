# Приклади SOLID-принципів

- `example01.ts` — Антипатерн: все в одному класі. Адреса як набір полів у `Person`.
- `example02.ts` — Single Responsibility Principle (SRP): виділення адреси в окремий клас `PersonAddress`.
- `example03.ts` — Антипатерн: жорстко закодована логіка знижок у `DiscountCalculator` (відсутність Open/Closed).
- `example04.ts` — Open/Closed Principle (OCP): стратегії знижок через інтерфейс `Discount` та реалізації (`RegularDiscount`, `VIPDiscount`, ...).
- `example05.ts` — SRP: простий клас `Rectangle`, підрахунок площі методом `area()`.
- `example06.ts` — Антипатерн: порушення OCP, `totalArea` залежить від типу фігури (`Rectangle`, `Circle`).
- `example07.ts` — OCP: інтерфейс `Shape`, метод `area()` для різних фігур (`Rectangle`, `Circle`).
- `example08.ts` — OCP: додавання нової фігури (`Triangle`) без зміни `totalArea`.
- `example09.ts` — Liskov Substitution Principle (LSP): порушення — `Square` наслідує `Rectangle`, але змінює поведінку `setWidth`, `setHeight`.
- `example10.ts` — LSP: виправлення — `Square` і `Rectangle` незалежні, обидва реалізують `Shape`.
- `example11.ts` — Interface Segregation Principle (ISP): антипатерн — `SimplePrinter` змушений реалізовувати непотрібні методи (`scan`, `fax`).
- `example12.ts` — ISP: розділення інтерфейсів `Printer`, `Scanner`, `Fax`.
- `example13.ts` — ISP: антипатерн — інтерфейс `Programmer` містить зайве для `RemoteProgrammer` (`eatPizza`).
- `example14.ts` — ISP: правильне розділення — `CodeProducer` і `PizzaConsumer`.
- `example15.ts` — Dependency Inversion Principle (DIP): антипатерн — `UserManager` напряму створює `ConsoleLogger`.
- `example16.ts` — DIP: `UserManager` отримує `ILogger` через конструктор (інверсія залежностей).
- `example17.ts` — DIP: `ApiClient` напряму використовує `axios` (антипатерн).
- `example18.ts` — DIP: `ApiClient` працює через інтерфейс `IHttpClient` (інверсія залежностей, можна підміняти реалізацію).
- `example19.ts` — DIP: декілька реалізацій `IHttpClient` (`AxiosHttpClient`, `FetchHttpClient`), `ApiClient` не залежить від конкретної бібліотеки.

---

Цей список допоможе студентам швидко знайти потрібний приклад по SOLID.
