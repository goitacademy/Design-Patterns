# Приклади патернів State, Strategy

- `example01.ts` — State (ручна реалізація): HttpRequest зі станами як string, методи змінюють state напряму, антипатерн для State
- `example02.ts` — State (ручна реалізація): Order зі станами як string, методи змінюють state напряму, антипатерн для State
- `example03.ts` — State (інтерфейс): HttpRequest з інтерфейсом RequestState, класи для кожного стану, делегування, асинхронна логіка
- `example04.ts` — State (інтерфейс): Order з інтерфейсом OrderState, класи для кожного стану, делегування, proceed
- `example05.ts` — State (інтерфейс): Transaction з інтерфейсом TransactionState, класи для кожного стану, process
- `example06.ts` — Strategy (ручна): ShippingCostCalculator, вибір стратегії через if/else, антипатерн для Strategy
- `example07.ts` — Strategy (ручна): sortUsers, вибір критерію сортування через if/else, антипатерн для Strategy
- `example08.ts` — Strategy (інтерфейс): UserSorter з інтерфейсом SortStrategy, класи-стратегії для різних критеріїв, setStrategy
