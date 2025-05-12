// Асинхронний підписник
export interface AsyncSubscriber<T> {
    update(context: T): Promise<void>;
}

// Видавець з асинхронним сповіщенням
export class AsyncPublisher<T> {
    private subscribers: Set<AsyncSubscriber<T>> = new Set();

    public subscribe(subscriber: AsyncSubscriber<T>): void {
        this.subscribers.add(subscriber);
    }

    public unsubscribe(subscriber: AsyncSubscriber<T>): void {
        this.subscribers.delete(subscriber);
    }

    public async notify(context: T): Promise<void> {
        const tasks = Array.from(this.subscribers).map(sub => sub.update(context));
        await Promise.allSettled(tasks);
    }
}

// Імітація збереження у базі даних
export class DatabaseLogger implements AsyncSubscriber<string> {
    async update(context: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log(`[DB] Записано подію: ${context}`);
    }
}

// Імітація асинхронного надсилання повідомлення
export class NotificationService implements AsyncSubscriber<string> {
    async update(context: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`[Notification] Відправлено повідомлення: ${context}`);
    }
}

const publisher = new AsyncPublisher<string>();

const dbLogger = new DatabaseLogger();
const notifier = new NotificationService();

publisher.subscribe(dbLogger);
publisher.subscribe(notifier);

(async () => {
    await publisher.notify('Система оновлена');
})();
