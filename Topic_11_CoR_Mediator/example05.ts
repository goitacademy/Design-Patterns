interface HelpCommand {
    name: 'help';
    payload: {
        command?: string;
    };
}

interface ExitCommand {
    name: 'exit';
    payload: {
        code: number;
    };
}

interface UnknownCommand {
    name: string;
    payload: null;
}

type Command = HelpCommand | ExitCommand | UnknownCommand;

interface CommandHandler {
    setNext(handler: CommandHandler): CommandHandler;
    handle(command: Command): boolean;
}

abstract class BaseCommandHandler implements CommandHandler {
    private next: CommandHandler | null = null;

    setNext(handler: CommandHandler): CommandHandler {
        this.next = handler;
        return handler;
    }

    handle(command: Command): boolean {
        if (this.next) {
            return this.next.handle(command);
        }
        return false;
    }
}

class HelpCommandHandler extends BaseCommandHandler {
    handle(command: Command): boolean {
        if (command.name === 'help' && command.payload) {
            console.log(command.payload.command
                ? `Довідка по команді '${command.payload.command}'`
                : 'Загальна довідка по командам');
            return true;
        }
        return super.handle(command);
    }
}

class ExitCommandHandler extends BaseCommandHandler {
    handle(command: Command): boolean {
        if (command.name === 'exit' && command.payload) {
            console.log(`Завершення роботи застосунку з кодом ${command.payload.code}`);
            return true;
        }
        return super.handle(command);
    }
}

class UnknownCommandHandler extends BaseCommandHandler {
    handle(command: Command): boolean {
        console.log(`Команда не розпізнана: ${command.name}`);
        return true;
    }
}

const help = new HelpCommandHandler();
const exit = new ExitCommandHandler();
const fallback = new UnknownCommandHandler();

help.setNext(exit).setNext(fallback);

const commands: Command[] = [
    { name: 'help', payload: { command: 'exit' } },
    { name: 'exit', payload: { code: 0 } },
    { name: 'status', payload: null },
];

commands.forEach((cmd) => help.handle(cmd));

