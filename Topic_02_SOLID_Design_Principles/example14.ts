interface CodeProducer {
  writeCode(): void;
}

interface PizzaConsumer {
  eatPizza(sliceCount: number): void;
}

class OfficeProgrammer implements CodeProducer, PizzaConsumer {
  constructor(private name: string) { }

  writeCode(): void {
    console.log(`${this.name} пише код.`);
  }

  eatPizza(sliceCount: number): void {
    console.log(`${this.name} їсть ${sliceCount} шматочків піци.`);
  }
}

class RemoteProgrammer implements CodeProducer {
  constructor(private name: string) { }

  writeCode(): void {
    console.log(`${this.name} пише код.`);
  }
}
