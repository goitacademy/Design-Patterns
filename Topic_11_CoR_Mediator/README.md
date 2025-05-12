# Приклади патернів Chain of Responsibility, Mediator

- `example01.ts` — Антипатерн: лінійна перевірка/обробка без ланцюга, if-else, немасштабується
- `example02.ts` — Chain of Responsibility (класичний): абстрактний handler, ланцюг обробників скарг, setNext, делегування
- `example03.ts` — Chain of Responsibility (дерево): дерево обробників, сповіщення передається всім дочірнім, різні типи логерів/нотифікаторів
- `example04.ts` — Chain of Responsibility (правила доступу): масив правил з пріоритетами, processRequest, гнучка система контролю доступу
- `example05.ts` — Chain of Responsibility (команди): ланцюг обробників команд CLI, fallback для невідомих команд
- `example06.ts` — Chain of Responsibility (комбінований): always-обробники (всі виконуються) + умовні (з break), безпечна обробка подій
- `example07.ts` — Chain of Responsibility (middleware): ланцюг middleware як у Express, next, logger/auth/handler
- `example08.ts` — Dispatcher (альтернатива CoR): реєстрація кількох handler-ів, всі отримують повідомлення, гнучка маршрутизація
- `example09.ts` — Антипатерн (без медіатора): прямі виклики між обʼєктами, tight coupling
- `example10.ts` — Mediator (ручний): централізована логіка взаємодії між полями форми, onChange, керування станом
- `example11.ts` — Mediator (інтерфейс): компоненти форми через setMediator, централізована логіка, notify
- `example12.ts` — Mediator (підсистеми): медіатори для підсистем (інвентар, платіж, доставка), placeOrder координує процес
