enum SecurityEventType {
    UNAUTHORIZED = 'unauthorized',
    ACCESS = 'access',
    MODIFICATION = 'modification',
}

interface SecurityEvent {
    type: SecurityEventType;
    user: string;
    resource: string;
    timestamp: Date;
}

interface EventHandler {
    handle(event: SecurityEvent): boolean;
}

class AuditTrailHandler implements EventHandler {
    handle(event: SecurityEvent): boolean {
        console.log(
            `[AUDIT] Користувач ${event.user} виконав дію ${event.type} над ${event.resource}`,
        );
        return false;
    }
}

class AccessBlockerHandler implements EventHandler {
    handle(event: SecurityEvent): boolean {
        if (event.type === SecurityEventType.UNAUTHORIZED) {
            console.log(`[BLOCK] Доступ для ${event.user} заблоковано`);
            return true;
        }
        return false;
    }
}

class AlertDispatcherHandler implements EventHandler {
    handle(event: SecurityEvent): boolean {
        if (
            event.type === SecurityEventType.MODIFICATION &&
            event.resource === 'config'
        ) {
            console.log(
                `[ALERT] Підозріле редагування конфігурації користувачем ${event.user}`,
            );
            return true;
        }
        return false;
    }
}

class SecurityEngine {
    constructor(
        private alwaysHandlers: EventHandler[],
        private conditionalHandlers: EventHandler[],
    ) {}

    dispatch(event: SecurityEvent): void {
        // Завжди виконати всі "always" обробники
        this.alwaysHandlers.forEach((handler) => handler.handle(event));

        // Виконати умовні обробники з можливим перериванням
        for (const handler of this.conditionalHandlers) {
            if (handler.handle(event)) break;
        }
    }
}

// Створюємо систему безпеки
const engine = new SecurityEngine(
    [new AuditTrailHandler()], // Завжди виконуються
    [new AccessBlockerHandler(), new AlertDispatcherHandler()], // Умовні
);

const events: SecurityEvent[] = [
    {
        type: SecurityEventType.UNAUTHORIZED,
        user: 'guest',
        resource: 'admin_panel',
        timestamp: new Date(),
    },
    {
        type: SecurityEventType.MODIFICATION,
        user: 'editor',
        resource: 'config',
        timestamp: new Date(),
    },
    {
        type: SecurityEventType.ACCESS,
        user: 'user1',
        resource: 'dashboard',
        timestamp: new Date(),
    },
];

events.forEach((e) => engine.dispatch(e));
