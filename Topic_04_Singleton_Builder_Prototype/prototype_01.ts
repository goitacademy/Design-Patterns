class Shape {
  public x: number;
  public y: number;
  public color: string;
  public borderWidth: number;
  private data: number[];
  private renderingCache: any;

  constructor(
    x: number,
    y: number,
    color: string,
    borderWidth: number,
    data: number[]
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.borderWidth = borderWidth;

    // Складні розрахунки та ініціалізація, що вимагають багато ресурсів
    this.data = data.map((value) => value * Math.random());

    // Ініціалізація кешу рендерингу - дорога операція
    this.renderingCache = this.initializeRenderingCache();
  }

  private initializeRenderingCache(): any {
    console.log("Ініціалізація кешу рендерингу - дорога операція");
    // Імітація дорогої операції
    let cache = {};
    for (let i = 0; i < 10000; i++) {
      // Складні обчислення для створення кешу
    }
    return cache;
  }

  // Приватний метод, недоступний ззовні
  private calculateInternalParameters(): void {
    // Внутрішні розрахунки з використанням приватних даних
  }
}

// Спроба скопіювати об'єкт ззовні
function createShapeCopy(originalShape: Shape): Shape {
  // Можемо отримати доступ лише до публічних полів
  return new Shape(
    originalShape.x,
    originalShape.y,
    originalShape.color,
    originalShape.borderWidth,
    [] // Немає доступу до приватного поля data!
  );

  // Не можемо скопіювати renderingCache та інші приватні поля
  // Також втрачаємо всі внутрішні стани об'єкта
}

// Створення першого об'єкта
const originalShape = new Shape(10, 20, "red", 5, [1, 2, 3, 4, 5]);
console.log(originalShape);
// Спроба копіювання - багато проблем:
// 1. Виконуються всі дорогі операції знову
// 2. Немає доступу до приватних полів
// 3. Код стає залежним від конкретного класу Shape
const shapeCopy = createShapeCopy(originalShape);
console.log(shapeCopy);
