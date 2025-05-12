interface Message {
    type: 'info' | 'error';
    text: string;
    userId: number;
}

interface MessageHandler {
    handle(message: Message): void;
}

class EmailHandler implements MessageHandler {
    handle(message: Message): void {
        console.log(
            `[EMAIL] Повідомлення для користувача ${message.userId}: ${message.text}`,
        );
    }
}

class UiNotificationHandler implements MessageHandler {
    handle(message: Message): void {
        console.log(`[UI] Сповіщення на екрані: ${message.text}`);
    }
}

class LoggingHandler implements MessageHandler {
    handle(message: Message): void {
        console.log(`[LOG] ${message.type.toUpperCase()}: ${message.text}`);
    }
}

class MessageDispatcher {
    private handlers: MessageHandler[] = [];

    register(handler: MessageHandler): void {
        this.handlers.push(handler);
    }

    dispatch(message: Message): void {
        for (const handler of this.handlers) {
            handler.handle(message);
        }
    }
}

// Уявна конфігурація каналів сповіщень користувача
interface UserNotificationSettings {
    email: boolean;
    ui: boolean;
    log: boolean;
}

function buildDispatcherFor(
    settings: UserNotificationSettings,
): MessageDispatcher {
    const dispatcher = new MessageDispatcher();
    if (settings.email) dispatcher.register(new EmailHandler());
    if (settings.ui) dispatcher.register(new UiNotificationHandler());
    if (settings.log) dispatcher.register(new LoggingHandler());
    return dispatcher;
}

// Тестування з різними налаштуваннями
const userSettingsA: UserNotificationSettings = {
    email: true,
    ui: true,
    log: false,
};
const userSettingsB: UserNotificationSettings = {
    email: false,
    ui: false,
    log: true,
};

const dispatcherA = buildDispatcherFor(userSettingsA);
const dispatcherB = buildDispatcherFor(userSettingsB);

dispatcherA.dispatch({
    type: 'info',
    text: 'Ваш профіль оновлено успішно',
    userId: 42,
});

dispatcherB.dispatch({
    type: 'error',
    text: 'Виникла помилка при збереженні',
    userId: 99,
});
