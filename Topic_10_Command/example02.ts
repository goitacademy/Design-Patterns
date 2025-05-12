class Light {
    turnOn(): void {
        console.log("💡 Світло увімкнено");
    }
}

interface Command {
    execute(): void;
}

class TurnOnCommand implements Command {
    constructor(private light: Light) { }

    execute(): void {
        this.light.turnOn();
    }
}

class RemoteControl {
    private command: Command | null = null;

    setCommand(command: Command): void {
        this.command = command;
    }

    pressButton(): void {
        if (this.command) {
            this.command.execute();
        }
    }
}

const light = new Light();
const command = new TurnOnCommand(light);
const remote = new RemoteControl();

remote.setCommand(command);
remote.pressButton();