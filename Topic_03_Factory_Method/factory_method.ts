// Інтерфейс Transport або продукт (Product)
// Визначає контракт, якому повинні відповідати всі конкретні продукти
interface Transport {
  deliver(): void;
  calculateCost(distance: number): number;
  getEstimatedTime(distance: number): number;
}

// Конкретний продукт #1: Наземний транспорт
class Truck implements Transport {
  deliver(): void {
    console.log("Доставка вантажу автомобілем по дорозі");
  }

  calculateCost(distance: number): number {
    return distance * 2.5; // 2.5 грн/км
  }

  getEstimatedTime(distance: number): number {
    return Math.ceil(distance / 80); // 80 км/год в середньому
  }
}

// Конкретний продукт #2: Морський транспорт
class Ship implements Transport {
  deliver(): void {
    console.log("Доставка вантажу кораблем по морю");
  }

  calculateCost(distance: number): number {
    return distance * 1.8 + 200; // Базова вартість + 1.8 грн/км
  }

  getEstimatedTime(distance: number): number {
    return Math.ceil(distance / 40); // 40 км/год в середньому
  }
}

// Конкретний продукт #3: Повітряний транспорт
class Plane implements Transport {
  deliver(): void {
    console.log("Доставка вантажу літаком по повітрю");
  }

  calculateCost(distance: number): number {
    return distance * 6.5 + 1500; // Висока базова вартість + 6.5 грн/км
  }

  getEstimatedTime(distance: number): number {
    return Math.ceil(distance / 800); // 800 км/год в середньому
  }
}

// Creator - абстрактний клас, який оголошує фабричний метод для створення продуктів
abstract class Logistics {

  abstract createTransport(): Transport;

  planDelivery(distance: number): void {
    // Створення продукту через фабричний метод
    const transport = this.createTransport();

    console.log("=== Планування доставки ===");
    transport.deliver();

    const cost = transport.calculateCost(distance);
    console.log(`Вартість: ${cost} грн`);

    const time = transport.getEstimatedTime(distance);
    console.log(`Орієнтовний час: ${time} годин`);
    console.log("===========================");
  }
}

// Конкретний творець #1: Створює наземний транспорт
class RoadLogistics extends Logistics {
  // Реалізація фабричного методу для створення об'єктів Truck
  createTransport(): Transport {
    return new Truck();
  }
}

// Конкретний творець #2: Створює морський транспорт
class SeaLogistics extends Logistics {
  // Реалізація фабричного методу для створення об'єктів Ship
  createTransport(): Transport {
    return new Ship();
  }
}

// Конкретний творець #3: Створює повітряний транспорт
class AirLogistics extends Logistics {
  // Реалізація фабричного методу для створення об'єктів Plane
  createTransport(): Transport {
    return new Plane();
  }
}

// Клієнтський код, який використовує патерн
function clientCode(logistics: Logistics, distance: number) {
  // Клієнт працює з абстракцією Logistics і не знає конкретних класів
  logistics.planDelivery(distance);
}

// Використання різних типів логістики
console.log("Використанно тип логістики RoadLogistics");
clientCode(new RoadLogistics(), 100);

console.log("\nВикористанно тип логістики SeaLogistics");
clientCode(new SeaLogistics(), 1000);

console.log("\nВикористанно тип логістики AirLogistics");
clientCode(new AirLogistics(), 2000);