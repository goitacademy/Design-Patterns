type PriorityLevel = 'high' | 'medium' | 'low';

interface GroupedSubscriber<T> {
    update(context: T): void;
}

class GroupedPublisher<T> {
    private readonly groups: Record<PriorityLevel, Set<GroupedSubscriber<T>>> = {
        high: new Set(),
        medium: new Set(),
        low: new Set()
    };

    public subscribe(subscriber: GroupedSubscriber<T>, priority: PriorityLevel): void {
        this.groups[priority].add(subscriber);
    }

    public unsubscribe(subscriber: GroupedSubscriber<T>): void {
        for (const group of Object.values(this.groups)) {
            group.delete(subscriber);
        }
    }

    public notify(context: T): void {
        for (const level of ['high', 'medium', 'low'] as PriorityLevel[]) {
            for (const subscriber of this.groups[level]) {
                subscriber.update(context);
            }
        }
    }
}

class PremiumSubscriber implements GroupedSubscriber<string> {
    update(context: string): void {
        console.log(`[Premium] Отримано: ${context}`);
    }
}

class FreeSubscriber implements GroupedSubscriber<string> {
    update(context: string): void {
        console.log(`[Free] Отримано: ${context}`);
    }
}

class InternalAudit implements GroupedSubscriber<string> {
    update(context: string): void {
        console.log(`[Audit] Зафіксовано: ${context}`);
    }
}

const publisher = new GroupedPublisher<string>();

const audit = new InternalAudit();
const premium = new PremiumSubscriber();
const free = new FreeSubscriber();

publisher.subscribe(free, 'low');
publisher.subscribe(premium, 'medium');
publisher.subscribe(audit, 'high');


publisher.notify('Система оновлена');
