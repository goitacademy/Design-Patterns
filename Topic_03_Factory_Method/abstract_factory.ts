
// Інтерфейс для стільця
interface Chair {
  sitOn(): void;
  hasLegs(): boolean;
  getStyle(): string;
}

// Інтерфейс для столу
interface Table {
  putOn(item: string): void;
  getStyle(): string;
  getNumberOfLegs(): number;
}

// Інтерфейс для дивана
interface Sofa {
  lieOn(): void;
  getSeatingCapacity(): number;
  getStyle(): string;
}

// 2. КОНКРЕТНІ ПРОДУКТИ
// Сучасні меблі
class ModernChair implements Chair {
  sitOn(): void {
    console.log("Сидіння на сучасному стільці: зручно, мінімалістично");
  }

  hasLegs(): boolean {
    return true; // Більшість сучасних стільців мають ніжки
  }

  getStyle(): string {
    return "сучасний";
  }
}

class ModernTable implements Table {
  putOn(item: string): void {
    console.log(`Розміщення ${item} на сучасному столі зі скляною поверхнею`);
  }

  getStyle(): string {
    return "сучасний";
  }

  getNumberOfLegs(): number {
    return 4;
  }
}

class ModernSofa implements Sofa {
  lieOn(): void {
    console.log("Лежання на сучасному дивані: комфортно, низько до підлоги");
  }

  getSeatingCapacity(): number {
    return 3;
  }

  getStyle(): string {
    return "сучасний";
  }
}

// Вікторіанські меблі
class VictorianChair implements Chair {
  sitOn(): void {
    console.log("Сидіння на вікторіанському стільці: вишукано, з прямою спинкою");
  }

  hasLegs(): boolean {
    return true; // Вікторіанські стільці завжди мають ніжки
  }

  getStyle(): string {
    return "вікторіанський";
  }
}

class VictorianTable implements Table {
  putOn(item: string): void {
    console.log(`Розміщення ${item} на вікторіанському столі з дерев'яною різьбленою поверхнею`);
  }

  getStyle(): string {
    return "вікторіанський";
  }

  getNumberOfLegs(): number {
    return 4;
  }
}

class VictorianSofa implements Sofa {
  lieOn(): void {
    console.log("Лежання на вікторіанському дивані: елегантно, з високими підлокітниками");
  }

  getSeatingCapacity(): number {
    return 2; // Вікторіанські дивани часто менші
  }

  getStyle(): string {
    return "вікторіанський";
  }
}

// 3. АБСТРАКТНА ФАБРИКА
interface FurnitureFactory {
  createChair(): Chair;
  createTable(): Table;
  createSofa(): Sofa;
}

// 4. КОНКРЕТНІ ФАБРИКИ
class ModernFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }

  createTable(): Table {
    return new ModernTable();
  }

  createSofa(): Sofa {
    return new ModernSofa();
  }
}

class VictorianFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new VictorianChair();
  }

  createTable(): Table {
    return new VictorianTable();
  }

  createSofa(): Sofa {
    return new VictorianSofa();
  }
}

// 5. КЛІЄНТСЬКИЙ КОД
function furnishLivingRoom(factory: FurnitureFactory): void {
  console.log("Обладнання вітальні...");

  // Створення меблів за допомогою фабрики
  const chair = factory.createChair();
  const table = factory.createTable();
  const sofa = factory.createSofa();

  // Використання створених меблів
  console.log(`Стиль меблів: ${chair.getStyle()}`);

  chair.sitOn();
  table.putOn("ваза з квітами");
  sofa.lieOn();

  console.log(`Диван вміщує ${sofa.getSeatingCapacity()} осіб`);
  console.log(`Стіл має ${table.getNumberOfLegs()} ніжки`);

  console.log("------------------------");
}

// Використання
console.log("Створення сучасної вітальні:");
furnishLivingRoom(new ModernFurnitureFactory());

console.log("\nСтворення вікторіанської вітальні:");
furnishLivingRoom(new VictorianFurnitureFactory());