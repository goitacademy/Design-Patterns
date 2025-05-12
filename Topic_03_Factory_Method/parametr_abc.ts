enum FurnitureStyle {
  MODERN = "сучасний",
  VICTORIAN = "вікторіанський"
}


class ModernChair {
  sitOn(): void {
    console.log("Сидіння на сучасному стільці: зручно, мінімалістично");
  }
  hasLegs(): boolean {
    return true;
  }
  getStyle(): string {
    return FurnitureStyle.MODERN;
  }
}

class ModernTable {
  putOn(item: string): void {
    console.log(`Розміщення ${item} на сучасному столі зі скляною поверхнею`);
  }
  getStyle(): string {
    return FurnitureStyle.MODERN;
  }
  getNumberOfLegs(): number {
    return 4;
  }
}

class ModernSofa {
  lieOn(): void {
    console.log("Лежання на сучасному дивані: комфортно, низько до підлоги");
  }
  getSeatingCapacity(): number {
    return 3;
  }
  getStyle(): string {
    return FurnitureStyle.MODERN;
  }
}

class VictorianChair {
  sitOn(): void {
    console.log("Сидіння на вікторіанському стільці: вишукано, з прямою спинкою");
  }
  hasLegs(): boolean {
    return true;
  }
  getStyle(): string {
    return FurnitureStyle.VICTORIAN;
  }
}

class VictorianTable {
  putOn(item: string): void {
    console.log(`Розміщення ${item} на вікторіанському столі з дерев'яною різьбленою поверхнею`);
  }
  getStyle(): string {
    return FurnitureStyle.VICTORIAN;
  }
  getNumberOfLegs(): number {
    return 4;
  }
}

class VictorianSofa {
  lieOn(): void {
    console.log("Лежання на вікторіанському дивані: елегантно, з високими підлокітниками");
  }
  getSeatingCapacity(): number {
    return 2;
  }
  getStyle(): string {
    return FurnitureStyle.VICTORIAN;
  }
}

class ConfigurableFurnitureFactory {
  private style: FurnitureStyle;

  constructor(style: FurnitureStyle) {
    this.style = style;
  }

  setStyle(style: FurnitureStyle): void {
    this.style = style;
    console.log(`Фабрику переналаштовано на стиль: ${style}`);
  }

  createChair() {
    if (this.style === FurnitureStyle.MODERN) {
      return new ModernChair();
    } else if (this.style === FurnitureStyle.VICTORIAN) {
      return new VictorianChair();
    }
    throw new Error(`Unsupported style: ${this.style}`);
  }

  createTable() {
    if (this.style === FurnitureStyle.MODERN) {
      return new ModernTable();
    } else if (this.style === FurnitureStyle.VICTORIAN) {
      return new VictorianTable();
    }
    throw new Error(`Unsupported style: ${this.style}`);
  }

  createSofa() {
    if (this.style === FurnitureStyle.MODERN) {
      return new ModernSofa();
    } else if (this.style === FurnitureStyle.VICTORIAN) {
      return new VictorianSofa();
    }
    throw new Error(`Unsupported style: ${this.style}`);
  }
}

function furnishLivingRoom(factory: ConfigurableFurnitureFactory): void {
  console.log("Обладнання вітальні...");

  const chair = factory.createChair();
  const table = factory.createTable();
  const sofa = factory.createSofa();

  console.log(`Стиль меблів: ${chair.getStyle()}`);
  chair.sitOn();
  table.putOn("ваза з квітами");
  sofa.lieOn();

  console.log(`Диван вміщує ${sofa.getSeatingCapacity()} осіб`);
  console.log(`Стіл має ${table.getNumberOfLegs()} ніжки`);
  console.log("------------------------");
}


const factory = new ConfigurableFurnitureFactory(FurnitureStyle.MODERN);

console.log("Створення сучасної вітальні:");
furnishLivingRoom(factory);


factory.setStyle(FurnitureStyle.VICTORIAN);

console.log("\nСтворення вікторіанської вітальні:");
furnishLivingRoom(factory);