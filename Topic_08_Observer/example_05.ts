type PriorityLevel = 'high' | 'medium' | 'low';

interface PullingSubscriber {
    update(): void;
}

class PrioritizedPullPublisher<T> {
    private readonly groups: Record<PriorityLevel, Set<PullingSubscriber>> = {
        high: new Set(),
        medium: new Set(),
        low: new Set()
    };

    private state: T;

    constructor(initial: T) {
        this.state = initial;
    }

    public getState(): T {
        return this.state;
    }

    public setState(value: T): void {
        this.state = value;
        this.notify();
    }

    public subscribe(subscriber: PullingSubscriber, priority: PriorityLevel): void {
        this.groups[priority].add(subscriber);
    }

    public unsubscribe(subscriber: PullingSubscriber): void {
        for (const group of Object.values(this.groups)) {
            group.delete(subscriber);
        }
    }

    public notify(): void {
        for (const level of ['high', 'medium', 'low'] as PriorityLevel[]) {
            for (const subscriber of this.groups[level]) {
                subscriber.update();
            }
        }
    }
}

class DashboardComponent implements PullingSubscriber {
    constructor(private source: PrioritizedPullPublisher<string>) { }

    update(): void {
        const data = this.source.getState();
        console.log(`[Dashboard] Оновлено: ${data}`);
    }
}

class InternalLogger implements PullingSubscriber {
    constructor(private source: PrioritizedPullPublisher<string>) { }

    update(): void {
        const snapshot = this.source.getState();
        console.log(`[Log] Створено запис: ${snapshot}`);
    }
}

const publisher = new PrioritizedPullPublisher<string>('init');

const dashboard = new DashboardComponent(publisher);
const logger = new InternalLogger(publisher);

publisher.subscribe(dashboard, 'medium');
publisher.subscribe(logger, 'high');

publisher.setState('Нове значення KPI');
