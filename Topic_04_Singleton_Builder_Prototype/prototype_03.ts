interface IShape<T> {
  clone(): T;
}

class Shape implements IShape<Shape> {
  public x: number;
  public y: number;
  public color: string;
  public borderWidth: number;
  private data: number[];
  private renderingCache: any;

  constructor(x: number, y: number, color: string, borderWidth: number, data: number[]) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.borderWidth = borderWidth;

    // Складні розрахунки та ініціалізація, що вимагають багато ресурсів
    this.data = data.map((value) => value * Math.random());

    // Ініціалізація кешу рендерингу – дорога операція
    this.renderingCache = this.initializeRenderingCache();
  }

  private initializeRenderingCache(): any {
    console.log("Ініціалізація кешу рендерингу – дорога операція");
    let cache = {};
    for (let i = 0; i < 10000; i++) {
      // Імітація складних обчислень для створення кешу
    }
    return cache;
  }

  // Метод для клонування об'єкта (прототипу)
  public clone(): Shape {

    const cloned = Object.create(Shape.prototype) as Shape;

    cloned.x = this.x;
    cloned.y = this.y;
    cloned.color = this.color;
    cloned.borderWidth = this.borderWidth;

    cloned.data = [...this.data];

    cloned.renderingCache = { ...this.renderingCache };

    return cloned;
  }
}

console.log("Створюємо початковий об'єкт");
const prototypeShape = new Shape(10, 20, 'red', 5, [1, 2, 3, 4, 5]);
console.log(prototypeShape);

console.log("\nКлонуємо прототип для створення подібного об'єкту");
const clonedShape1 = prototypeShape.clone();
clonedShape1.color = 'blue';
clonedShape1.x = 30;
console.log(clonedShape1);

