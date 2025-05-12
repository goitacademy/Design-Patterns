type EventType = 'profile-update' | 'password-change' | 'avatar-upload';

interface PullTypedSubscriber {
    update(event: EventType): void;
}

interface PullTypedPublisher<T> {
    getState(event: EventType): T;
    subscribe(event: EventType, subscriber: PullTypedSubscriber): void;
    unsubscribe(subscriber: PullTypedSubscriber): void;
}

class PullEventPublisher<T> implements PullTypedPublisher<T> {
    private subscribers: Map<EventType, Set<PullTypedSubscriber>> = new Map();
    private state: Map<EventType, T> = new Map();

    constructor() {
        this.subscribers.set('profile-update', new Set());
        this.subscribers.set('password-change', new Set());
        this.subscribers.set('avatar-upload', new Set());
    }

    public subscribe(event: EventType, subscriber: PullTypedSubscriber): void {
        this.subscribers.get(event)?.add(subscriber);
    }

    public unsubscribe(subscriber: PullTypedSubscriber): void {
        for (const set of this.subscribers.values()) {
            set.delete(subscriber);
        }
    }

    public getState(event: EventType): T {
        return this.state.get(event)!;
    }

    public notify(event: EventType, data: T): void {
        this.state.set(event, data);
        const subs = this.subscribers.get(event);
        if (!subs) return;
        for (const subscriber of subs) {
            subscriber.update(event);
        }
    }

}

class EventLogger implements PullTypedSubscriber {
    constructor(private source: PullTypedPublisher<string>) { }

    update(event: EventType): void {
        const value = this.source.getState(event);
        console.log(`[LOG] Подія: ${event}, Значення: ${value}`);
    }
}

const publisher = new PullEventPublisher<string>();
const logger = new EventLogger(publisher);

publisher.subscribe('password-change', logger);
publisher.subscribe('profile-update', logger);

publisher.notify('profile-update', 'gupalo');
publisher.notify('password-change', 'gupalo: new password hash');
