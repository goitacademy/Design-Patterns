class Rectangle {
  constructor(public width: number, public height: number) { }
}

class Circle {
  constructor(public radius: number) { }
}

function totalArea(shapes: any[]): number {
  let area = 0;
  for (const shape of shapes) {
    if (shape instanceof Rectangle) {
      area += shape.width * shape.height;
    } else if (shape instanceof Circle) {
      area += Math.PI * shape.radius ** 2;
    }
  }
  return area;
}

const shapes = [new Rectangle(10, 10), new Rectangle(4, 5), new Circle(10)];
console.log(totalArea(shapes)); 
