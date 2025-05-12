interface Programmer {
  writeCode(): void;
  eatPizza(sliceCount: number): void;
}

class OfficeProgrammer implements Programmer {
  constructor(private name: string) { }

  writeCode(): void {
    console.log(`${this.name} пише код.`);
  }

  eatPizza(sliceCount: number): void {
    console.log(`${this.name} їсть ${sliceCount} шматочків піци.`);
  }
}

class RemoteProgrammer implements Programmer {
  constructor(private name: string) { }

  writeCode(): void {
    console.log(`${this.name} пише код.`);
  }

  eatPizza(sliceCount: number): void {
    // Віддалений програміст не їсть офісну піцу, тому доводиться створювати заглушку
  }
}
