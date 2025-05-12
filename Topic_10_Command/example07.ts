interface Command {
    execute(): void;
    undo(): void;
}

class Archer {
    place(): void {
        console.log("Placed Archer at A1");
    }

    remove(): void {
        console.log("Removed Archer from A1");
    }
}

class Mage {
    place(): void {
        console.log("Placed Mage at A2");
    }

    remove(): void {
        console.log("Removed Mage from A2");
    }
}

class Warrior {
    place(): void {
        console.log("Placed Warrior at A3");
    }

    remove(): void {
        console.log("Removed Warrior from A3");
    }
}

class PlaceArcherCommand implements Command {
    constructor(private archer: Archer) { }

    execute(): void {
        this.archer.place();
    }

    undo(): void {
        this.archer.remove();
    }
}

class PlaceMageCommand implements Command {
    constructor(private mage: Mage) { }

    execute(): void {
        this.mage.place();
    }

    undo(): void {
        this.mage.remove();
    }
}

class PlaceWarriorCommand implements Command {
    constructor(private warrior: Warrior) { }

    execute(): void {
        this.warrior.place();
    }

    undo(): void {
        this.warrior.remove();
    }
}

class MacroCommand implements Command {
    constructor(private commands: Command[]) { }

    execute(): void {
        for (const command of this.commands) {
            command.execute();
        }
    }

    undo(): void {
        for (const command of [...this.commands].reverse()) {
            command.undo();
        }
    }
}


const archer = new Archer();
const mage = new Mage();
const warrior = new Warrior();

const placeArcher = new PlaceArcherCommand(archer);
const placeMage = new PlaceMageCommand(mage);
const placeWarrior = new PlaceWarriorCommand(warrior);

const squadDeployment = new MacroCommand([
    placeArcher,
    placeMage,
    placeWarrior,
]);

squadDeployment.execute();
console.log('--------------------------------');
console.log('Виконуємо якісь інші дії');
console.log('--------------------------------');
squadDeployment.undo();
