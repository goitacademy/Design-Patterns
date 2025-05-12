interface Command {
    type: string;
    payload?: any;
}

const createUserCommand: Command = {
    type: "CREATE_USER",
    payload: {
        name: "Іван",
        email: "ivan@example.com"
    }
};

class CommandBus {
    dispatch(command: Command): void {
        switch (command.type) {
            case "CREATE_USER":
                this.createUser(command.payload);
                break;
            default:
                console.warn("Невідома команда:", command.type);
        }
    }

    private createUser(data: { name: string; email: string }): void {
        console.log("Користувача створено:", data.name, "<" + data.email + ">");
    }
}

const commandBus = new CommandBus();
commandBus.dispatch(createUserCommand);