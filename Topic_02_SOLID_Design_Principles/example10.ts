interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) { }

  area(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(public side: number) { }

  area(): number {
    return this.side * this.side;
  }
}

function printArea(shape: Shape) {
  console.log(shape.area());
}

// Використання:
printArea(new Rectangle(4, 5));
printArea(new Square(5));
