class Light {
    private isOn = false;

    turnOn(): void {
        this.isOn = true;
        console.log("💡 Світло увімкнено");
    }

    turnOff(): void {
        this.isOn = false;
        console.log("🔌 Світло вимкнено");
    }
}

interface Command {
    execute(): void;
    undo(): void;
}

class TurnOnCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOn();
    }

    undo(): void {
        this.light.turnOff();
    }
}

class TurnOffCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOff();
    }

    undo(): void {
        this.light.turnOn();
    }
}

class CommandQueue {
    private queue: Command[] = [];

    addCommand(command: Command): void {
        this.queue.push(command);
    }

    runAll(): void {
        for (const command of this.queue) {
            command.execute();
        }
        this.queue = [];
    }
}

const light = new Light();
const queue = new CommandQueue();

const turnOn = new TurnOnCommand(light);
const turnOff = new TurnOffCommand(light);

queue.addCommand(turnOn);
queue.addCommand(turnOff);
queue.addCommand(turnOn);

queue.runAll();