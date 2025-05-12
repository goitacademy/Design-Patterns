// Визначаємо Enum для типів транспорту
enum TransportType {
  TRUCK = "TRUCK",
  SHIP = "SHIP",
  PLANE = "PLANE",
  TRAIN = "TRAIN"  // Додали новий тип для демонстрації гнучкості
}

// Інтерфейс продукту залишається незмінним
interface Transport {
  deliver(): void;
  calculateCost(distance: number): number;
  getEstimatedTime(distance: number): number;
}

// Конкретні продукти також залишаються без змін
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

// Додаємо новий тип транспорту для демонстрації гнучкості системи
class Train implements Transport {
  deliver(): void {
    console.log("Доставка вантажу потягом по рейках");
  }

  calculateCost(distance: number): number {
    return distance * 2.0 + 300; // Базова вартість + 2.0 грн/км
  }

  getEstimatedTime(distance: number): number {
    return Math.ceil(distance / 120); // 120 км/год в середньому
  }
}

// Клас з параметризованим фабричним методом
class ConfigurableLogistics {
  // Фабричний метод, який приймає тип транспорту як параметр
  createTransport(type: TransportType): Transport {
    switch (type) {
      case TransportType.TRUCK:
        return new Truck();
      case TransportType.SHIP:
        return new Ship();
      case TransportType.PLANE:
        return new Plane();
      case TransportType.TRAIN:
        return new Train();
      default:
        // Тип never гарантує, що всі можливі значення Enum опрацьовані
        const exhaustiveCheck: never = type;
        throw new Error(`Невідомий тип транспорту: ${exhaustiveCheck}`);
    }
  }

  // Метод планування доставки, який також приймає тип транспорту
  planDelivery(type: TransportType, distance: number): void {
    console.log(`=== Планування доставки типом: ${type} ===`);

    // Створення відповідного транспорту за допомогою фабричного методу
    const transport = this.createTransport(type);

    // Використання транспорту для доставки
    transport.deliver();

    // Розрахунок вартості та часу
    const cost = transport.calculateCost(distance);
    console.log(`Вартість: ${cost} грн`);

    const time = transport.getEstimatedTime(distance);
    console.log(`Орієнтовний час: ${time} годин`);
    console.log("===========================");
  }
}


function demonstrateConfigurableLogistics(): void {
  console.log("Демонстрація конфігурованої логістики:");

  const logistics = new ConfigurableLogistics();

  // Використання різних типів транспорту
  logistics.planDelivery(TransportType.TRUCK, 100);
  logistics.planDelivery(TransportType.SHIP, 1000);
  logistics.planDelivery(TransportType.PLANE, 2000);
  logistics.planDelivery(TransportType.TRAIN, 500);
}


demonstrateConfigurableLogistics();