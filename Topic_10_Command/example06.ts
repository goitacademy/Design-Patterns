interface Command {
    type: string;
    payload?: any;
}

interface CommandObserver {
    update(command: Command): void;
}

class EventCommandBus {
    private observers: Map<string, CommandObserver[]> = new Map();

    subscribe(commandType: string, observer: CommandObserver): void {
        const observers = this.observers.get(commandType) ?? [];
        this.observers.set(commandType, [...observers, observer]);
    }

    unsubscribe(commandType: string, observer: CommandObserver): void {
        const observers = this.observers.get(commandType);
        if (!observers) return;

        this.observers.set(
            commandType,
            observers.filter(obs => obs !== observer)
        );
    }

    dispatch(command: Command): void {
        console.log(`Dispatching command: ${command.type}`);

        this.notifyObservers(command.type, command);
        this.notifyObservers('*', command);
    }

    private notifyObservers(type: string, command: Command): void {
        const observers = this.observers.get(type);
        observers?.forEach(observer => observer.update(command));
    }
}

class LoggingService implements CommandObserver {
    update(command: Command): void {
        console.log(`[LOG] Command executed: ${command.type}`, command.payload);
    }
}

class NotificationService implements CommandObserver {
    update(command: Command): void {
        console.log(`[NOTIFICATION] New user created: ${command.payload.name}`);
    }
}

class AnalyticsService implements CommandObserver {
    private userCreationCount = 0;

    update(command: Command): void {
        this.userCreationCount++;
        console.log(`[ANALYTICS] Total users created: ${this.userCreationCount}`);
    }
}

const commandBus = new EventCommandBus();

const logger = new LoggingService();
const notifier = new NotificationService();
const analytics = new AnalyticsService();

commandBus.subscribe('*', logger);
commandBus.subscribe('CREATE_USER', notifier);
commandBus.subscribe('CREATE_USER', analytics);

const createUserCommand: Command = {
    type: "CREATE_USER",
    payload: {
        name: "Іван",
        email: "ivan@example.com"
    }
};

commandBus.dispatch(createUserCommand);