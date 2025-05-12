class Rectangle {
  constructor(public width: number, public height: number) { }

  area(): number {
    return this.width * this.height;
  }
}

function totalArea(shapes: Rectangle[]): number {
  return shapes.reduce((acc, shape) => acc + shape.width * shape.height, 0);
}


const shapes = [new Rectangle(10, 10), new Rectangle(4, 5)];
console.log(totalArea(shapes)); 
