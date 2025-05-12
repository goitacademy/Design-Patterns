interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) { }

  area(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  constructor(public radius: number) { }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Triangle implements Shape {
  constructor(public base: number, public height: number) { }

  area(): number {
    return 0.5 * this.base * this.height;
  }
}

function totalArea(shapes: Shape[]): number {
  return shapes.reduce((acc, shape) => acc + shape.area(), 0);
}


const shapes: Shape[] = [
  new Rectangle(10, 10),
  new Rectangle(4, 5),
  new Circle(10),
  new Triangle(10, 5),
];

console.log(totalArea(shapes)); 
