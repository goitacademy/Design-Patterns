type BusEventType = 'user-registered' | 'profile-updated';

interface BusEventPayload {
    userId: string;
    timestamp: number;
}

interface EventSubscriber<T> {
    handle(event: BusEventType, payload: T): void;
}

class EventBus {
    private subscribers: Map<BusEventType, Set<EventSubscriber<BusEventPayload>>> = new Map();

    public subscribe(event: BusEventType, subscriber: EventSubscriber<BusEventPayload>): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set());
        }
        this.subscribers.get(event)!.add(subscriber);
    }

    public unsubscribe(subscriber: EventSubscriber<BusEventPayload>): void {
        for (const set of this.subscribers.values()) {
            set.delete(subscriber);
        }
    }

    public publish(event: BusEventType, payload: BusEventPayload): void {
        const group = this.subscribers.get(event);
        if (!group) return;
        for (const subscriber of group) {
            subscriber.handle(event, payload);
        }
    }
}

class EmailNotifier implements EventSubscriber<BusEventPayload> {
    handle(event: BusEventType, payload: BusEventPayload): void {
        console.log(`[Email] Надіслано вітальне повідомлення користувачу: ${payload.userId}`);
    }
}

class EventLogger implements EventSubscriber<BusEventPayload> {
    handle(event: BusEventType, payload: BusEventPayload): void {
        console.log(`[Log] Подія: ${event}, Дані: ${JSON.stringify(payload)}`);
    }
}

const bus = new EventBus();

const email = new EmailNotifier();
const logger = new EventLogger();

bus.subscribe('user-registered', email);
bus.subscribe('user-registered', logger);
bus.subscribe('profile-updated', logger);

// Видавець
bus.publish('user-registered', { userId: '12345', timestamp: Date.now() });
bus.publish('profile-updated', { userId: '23456', timestamp: Date.now() });
