class Rectangle {
  constructor(public width: number, public height: number) { }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }

  setWidth(width: number) {
    this.width = width;
    this.height = width;
  }

  setHeight(height: number) {
    this.height = height;
    this.width = height;
  }
}

function increaseHeight(rect: Rectangle) {
  rect.setHeight(rect.height + 10);
}

// Очікується, що зміниться тільки висота
const rectangle = new Rectangle(10, 20);
const square = new Square(10);

increaseHeight(rectangle);  // Все добре
increaseHeight(square);     // Неочікувано змінює ширину
