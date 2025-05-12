function WithTimestamp<T extends { new (...args: any[]): {} }>(Base: T): T {
    return class extends Base {
      createdAt = new Date();
    };
  }


@WithTimestamp
class MyDocument {
  constructor(public name: string) {}
}

const file = new MyDocument("README.md") as any;
console.log(file.name); // "README.md"
console.log(file.createdAt); // Дата створення
