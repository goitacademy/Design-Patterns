class Car {
    // Атрибути (поля класу)
    brand: string;
    model: string;
    year: number;
    color: string;

    // Конструктор, який ініціалізує новий об’єкт класу
    constructor(brand: string, model: string, color: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.year = year;
    }

    // Методи класу
    drive(): void {
        console.log(`${this.color} ${this.brand} ${this.model} починає рух.`);
    }

    stop(): void {
        console.log(`${this.brand} ${this.model} зупинився.`);
    }
}

// Створення екземплярів (об’єктів) класу Car
const toyota = new Car("Toyota", "Camry", "білий", 2020);
const bmw = new Car("BMW", "X5", "чорний", 2021);

toyota.drive(); // Білий Toyota Camry починає рух.
bmw.stop();     // BMW X5 зупинився.
