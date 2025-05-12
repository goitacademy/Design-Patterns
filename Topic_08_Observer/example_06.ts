type EventType = 'profile-update' | 'password-change' | 'avatar-upload';

interface TypedSubscriber<T> {
    update(context: T, event: EventType): void;
}

class TypedPublisher<T> {
    private subscribers: Map<EventType, Set<TypedSubscriber<T>>> = new Map();

    constructor() {
        this.subscribers.set('profile-update', new Set());
        this.subscribers.set('password-change', new Set());
        this.subscribers.set('avatar-upload', new Set());
    }

    public subscribe(event: EventType, subscriber: TypedSubscriber<T>): void {
        this.subscribers.get(event)?.add(subscriber);
    }

    public unsubscribe(subscriber: TypedSubscriber<T>): void {
        for (const set of this.subscribers.values()) {
            set.delete(subscriber);
        }
    }

    public notify(context: T, event: EventType): void {
        const group = this.subscribers.get(event);
        if (!group) return;
        for (const subscriber of group) {
            subscriber.update(context, event);
        }
    }
}

class AuditLogger implements TypedSubscriber<string> {
    update(context: string, event: EventType): void {
        console.log(`[Audit] Подія: ${event}, Дані: ${context}`);
    }
}

class AvatarCache implements TypedSubscriber<string> {
    update(context: string, event: EventType): void {
            console.log(`[Cache] Очищено кеш аватарів для користувача: ${context}`);
    }
}

const publisher = new TypedPublisher<string>();

const audit = new AuditLogger();
const cache = new AvatarCache();

publisher.subscribe('profile-update', audit);
publisher.subscribe('password-change', audit);
publisher.subscribe('avatar-upload', audit);
publisher.subscribe('avatar-upload', cache);

publisher.notify('gupalo', 'profile-update');
publisher.notify('gupalo', 'avatar-upload');
publisher.notify('gupalo', 'password-change');
