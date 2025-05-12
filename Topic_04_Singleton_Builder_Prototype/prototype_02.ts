// Інтерфейс Prototype
interface Prototype {
  clone(): Prototype;
}

// Конкретний прототип
class ConcretePrototype implements Prototype {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  clone(): Prototype {
    // Створюємо нову копію об'єкта
    return new ConcretePrototype(this.data);
  }

  setData(data: string): void {
    this.data = data;
  }

  getData(): string {
    return this.data;
  }
}

// Використання
const original = new ConcretePrototype("original data");
const clone = original.clone() as ConcretePrototype;

console.log("Початкові дані");
console.log(original.getData());
console.log(clone.getData());

console.log("\nЗмінюємо дані у клоні");
clone.setData("modified data");
console.log(original.getData());
console.log(clone.getData());
