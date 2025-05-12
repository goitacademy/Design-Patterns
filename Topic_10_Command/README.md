# Приклади патерну Command

- `example01.ts` — Пряма дія: клас без патерну, виклик методу напряму (антипатерн для Command)
- `example02.ts` — Command (базовий): інтерфейс команди, інкапсуляція дії, remote.setCommand/pressButton
- `example03.ts` — Command (undo): команди з undo, remote з історією, відміна останньої дії
- `example04.ts` — Command (macro/черга): дві команди (on/off), черга команд, виконання послідовно
- `example05.ts` — Command Bus (простий): обʼєкт-команда з type/payload, диспетчер виконує дію по type
- `example06.ts` — Command Bus + Observer: підписка на типи команд, сповіщення кількох сервісів (лог, аналітика, нотифікації)
- `example07.ts` — Macro Command: команди для різних юнітів, макрокоманда для групового виконання/undo
- `example08.ts` — Async Command: асинхронна команда (fetch), паралельне виконання, Promise.allSettled
- `example09.ts` — Async Command (generic + результат): асинхронна команда з типізованим результатом, збір результатів, обробка помилок
