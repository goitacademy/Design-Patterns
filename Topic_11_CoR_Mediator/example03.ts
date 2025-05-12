interface SystemNotification {
    level: 'INFO' | 'WARNING' | 'ERROR';
    message: string;
    timestamp: Date;
}

interface TreeHandler {
    addChild(handler: TreeHandler): void;
    handle(notification: SystemNotification): void;
}

abstract class AbstractTreeHandler implements TreeHandler {
    protected children: TreeHandler[] = [];

    addChild(handler: TreeHandler): void {
        this.children.push(handler);
    }

    handle(notification: SystemNotification): void {
        this.process(notification);

        // Передача сповіщення всім дочірнім обробникам
        for (const child of this.children) {
            child.handle(notification);
        }
    }

    protected abstract process(notification: SystemNotification): void;
}

class ConsoleLogger extends AbstractTreeHandler {
    protected process(notification: SystemNotification): void {
        const timestamp = notification.timestamp.toISOString();
        console.log(`[${timestamp}] [LOGGER] ${notification.level}: ${notification.message}`);
    }
}

class AuditLogger extends AbstractTreeHandler {
    protected process(notification: SystemNotification): void {
        if (notification.level === 'ERROR') {
            const timestamp = notification.timestamp.toISOString();
            console.log(`[${timestamp}] [AUDIT] Критична подія: ${notification.message}`);
            // У реальній системі тут був би код для запису в захищене сховище аудиту
        }
    }
}

class UserNotifier extends AbstractTreeHandler {
    protected process(notification: SystemNotification): void {
        if (notification.level === 'WARNING' || notification.level === 'ERROR') {
            console.log(`[${notification.timestamp.toISOString()}] [USER_NOTIFIER] Повідомлення для користувача: ${notification.message}`);
            // У реальній системі тут був би код для відображення повідомлення в інтерфейсі користувача
        }
    }
}

class IntegrationNotifier extends AbstractTreeHandler {
    protected process(notification: SystemNotification): void {
        if (notification.level === 'ERROR') {
            console.log(`[${notification.timestamp.toISOString()}] [INTEGRATION] Відправлено сповіщення в Slack: ${notification.message}`);
            // У реальній системі тут був би код для інтеграції зі Slack API
        }
    }
}

class EmailNotifier extends AbstractTreeHandler {
    protected process(notification: SystemNotification): void {
        if (notification.level === 'ERROR') {
            console.log(`[${notification.timestamp.toISOString()}] [EMAIL] Відправлено email про критичну подію: ${notification.message}`);
            // У реальній системі тут був би код для відправки електронного листа
        }
    }
}

// Створення обробників
const rootLogger = new ConsoleLogger();
const auditLogger = new AuditLogger();
const userNotifier = new UserNotifier();
const integrationNotifier = new IntegrationNotifier();
const emailNotifier = new EmailNotifier();

// Побудова дерева обробників
rootLogger.addChild(auditLogger);
rootLogger.addChild(userNotifier);
userNotifier.addChild(integrationNotifier);
userNotifier.addChild(emailNotifier);

// Тестові сповіщення
const notifications: SystemNotification[] = [
    { level: 'INFO', message: 'Операція виконана успішно', timestamp: new Date() },
    { level: 'WARNING', message: 'Перевищено допустимий ліміт', timestamp: new Date() },
    { level: 'ERROR', message: 'Збій бази даних', timestamp: new Date() },
];

// Обробка сповіщень
notifications.forEach((notification, index) => {
    console.log(`\nОбробка сповіщення ${index + 1}: ${notification.level} - ${notification.message}`);
    console.log('-'.repeat(50));
    rootLogger.handle(notification);
});