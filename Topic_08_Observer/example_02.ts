// Інтерфейс видавця з методом доступу до стану
interface PullPublisher<T> {
    getState(): T;
    subscribe(subscriber: Subscriber<void>): void;
    unsubscribe(subscriber: Subscriber<void>): void;
}

// Абстрактний підписник, який реагує на повідомлення без аргументів
interface Subscriber<T> {
    update(context: T): void;
}

// Конкретний видавець із реалізацією pull-моделі
class NewsAgency implements PullPublisher<string> {
    private subscribers: Set<Subscriber<void>> = new Set();
    private latestHeadline: string = '';

    public subscribe(subscriber: Subscriber<void>): void {
        this.subscribers.add(subscriber);
    }

    public unsubscribe(subscriber: Subscriber<void>): void {
        this.subscribers.delete(subscriber);
    }

    public getState(): string {
        return this.latestHeadline;
    }

    public publishHeadline(headline: string): void {
        this.latestHeadline = headline;
        this.notify();
    }

    private notify(): void {
        for (const subscriber of this.subscribers) {
            subscriber.update();
        }
    }
}

// Підписник, який звертається до агенції після сповіщення
class NewsReader implements Subscriber<void> {
    private name: string;
    private source: PullPublisher<string>;

    constructor(name: string, source: PullPublisher<string>) {
        this.name = name;
        this.source = source;
    }

    update(): void {
        const headline = this.source.getState();
        console.log(`${this.name} читає заголовок: ${headline}`);
    }
}

const agency = new NewsAgency();

const alice = new NewsReader('Аліса', agency);
const bob = new NewsReader('Боб', agency);

agency.subscribe(alice);
agency.subscribe(bob);

agency.publishHeadline('Новий закон ухвалено');
agency.publishHeadline('Підвищення курсу валют');
