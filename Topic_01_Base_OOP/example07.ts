abstract class Shape {
    // Абстрактний метод для розрахунку площі, що немає реалізації
    abstract getArea(): number;

    // Звичайний метод, який використовує абстрактний метод
    printArea(): void {
        console.log(`Площа цієї фігури: ${this.getArea()} квадратних одиниць.`);
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

const rectangle = new Rectangle(10, 20);
const circle = new Circle(5);

const areaRectangle = rectangle.getArea();
const areaCircle = circle.getArea();

console.log(`Площа прямокутника: ${areaRectangle} квадратних одиниць.`);
console.log(`Площа кола: ${areaCircle} квадратних одиниць.`);

const shapes: Shape[] = [new Rectangle(10, 20), new Circle(5)];

shapes.forEach(shape => {
    console.log(`Площа фігури: ${shape.getArea()}`);
});