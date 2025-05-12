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

class RemoteControl {
    private command: Command | null = null;
    private history: Command[] = [];

    setCommand(command: Command): void {
        this.command = command;
    }

    pressButton(): void {
        if (this.command) {
            this.command.execute();
            this.history.push(this.command);
        }
    }

    pressUndo(): void {
        const lastCommand = this.history.pop();
        if (lastCommand) {
            lastCommand.undo();
        }
    }
}

const light = new Light();
const command = new TurnOnCommand(light);
const remote = new RemoteControl();

remote.setCommand(command);
remote.pressButton();
remote.pressUndo();    