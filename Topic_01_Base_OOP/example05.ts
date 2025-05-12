class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): void {
        console.log("Тварина видає звук");
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name); 
    }

    makeSound(): void {
        console.log(`${this.name} каже Мяу!`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} каже Гав!`);
    }
}

class HuntingDog extends Dog {
    breed: string;

    constructor(name: string, breed: string) {
        super(name); 
        this.breed = breed;
    }

    makeSound(): void {
        console.log(`${this.breed} ${this.name} голосно каже Гав-Гав!`);
    }

    hunt(): void {
        console.log(`${this.breed} ${this.name} пішов на полювання.`);
    }
}


const cat = new Cat("Мурчик");
cat.makeSound(); 

const dog = new Dog("Барсик");
dog.makeSound(); 

const hunter = new HuntingDog("Рекс", "Лайка");
hunter.makeSound(); 
hunter.hunt(); 
