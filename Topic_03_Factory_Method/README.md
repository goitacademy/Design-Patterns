# Приклади патерну Factory Method, Abstract Factory

- `factory.ts` — Базовий приклад простого фабричного методу. Клас `TransportFactory` створює об'єкти `Truck` або `Ship` за рядковим параметром.
- `factory_method.ts` — Класичний Factory Method. Абстрактний клас `Logistics` з фабричним методом `createTransport()`, різні підкласи (`RoadLogistics`, `SeaLogistics`, `AirLogistics`) повертають різні типи транспорту (`Truck`, `Ship`, `Plane`). Додаткові методи для розрахунку вартості та часу доставки.
- `parametr_factory.ts` — Параметризований фабричний метод. Клас `ConfigurableLogistics` створює різні типи транспорту (`Truck`, `Ship`, `Plane`, `Train`) за enum-параметром, демонстрація розширюваності фабрики.
- `abstract_factory.ts` — Абстрактна фабрика. Інтерфейс `FurnitureFactory` для створення групи пов'язаних об'єктів (`Chair`, `Table`, `Sofa`) у різних стилях (`Modern`, `Victorian`). Конкретні фабрики створюють відповідні об'єкти.
- `parametr_abc.ts` — Параметризована фабрика для меблів. Клас `ConfigurableFurnitureFactory` створює різні типи меблів (`ModernChair`, `VictorianChair` тощо) залежно від стилю, показує, як фабрика може змінювати стиль на льоту.
