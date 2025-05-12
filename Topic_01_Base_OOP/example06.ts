class Character {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    attack(): void {
        console.log(`${this.name} завдає стандартний удар.`);
    }
}

class Warrior extends Character {
    attack(): void {
        console.log(`${this.name} завдає потужний удар мечем!`);
    }
}

class Mage extends Character {
    attack(): void {
        console.log(`${this.name} запускає вогняну кулю!`);
    }
}

class Archer extends Character {
    attack(): void {
        console.log(`${this.name} стріляє з лука.`);
    }
}

const warrior = new Warrior("Конан");
const mage = new Mage("Гендальф");
const archer = new Archer("Леґолас");

warrior.attack();
mage.attack();
archer.attack(); 


const characters: Character[] = [
    new Warrior("Конан"),
    new Mage("Гендальф"),
    new Archer("Леґолас"),
];

characters.forEach(character => character.attack());