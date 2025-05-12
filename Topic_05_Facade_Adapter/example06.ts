interface OldSystemInterface {
  legacyOperation(): string;
}

interface NewSystemInterface {
  modernOperation(): string;
}

class OldSystem implements OldSystemInterface {
  legacyOperation(): string {
    return "Виконую стару операцію";
  }
}

class NewSystem implements NewSystemInterface {
  modernOperation(): string {
    return "Виконую нову операцію";
  }
}

// Двосторонній адаптер
class BidirectionalAdapter implements OldSystemInterface, NewSystemInterface {
  private oldSystem: OldSystemInterface;
  private newSystem: NewSystemInterface;

  constructor(oldSystem: OldSystemInterface, newSystem: NewSystemInterface) {
    this.oldSystem = oldSystem;
    this.newSystem = newSystem;
  }

  // Реалізація інтерфейсу OldSystemInterface
  legacyOperation(): string {
    console.log("Адаптер перенаправляє виклик до старої системи");
    return this.oldSystem.legacyOperation();
  }

  // Реалізація інтерфейсу NewSystemInterface
  modernOperation(): string {
    console.log("Адаптер перенаправляє виклик до нової системи");
    return this.newSystem.modernOperation();
  }
}

// Використання
const oldSystem = new OldSystem();
const newSystem = new NewSystem();
const adapter = new BidirectionalAdapter(oldSystem, newSystem);

// Використання адаптера з інтерфейсом старої системи
console.log(adapter.legacyOperation());

// Використання адаптера з інтерфейсом нової системи
console.log(adapter.modernOperation());