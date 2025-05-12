// Абстрактний підписник. Узагальнений щодо типу повідомлення.
interface Subscriber<T> {
    update(context: T): void;
}

// Видавець. Містить методи підписки, відписки та сповіщення.
class Publisher<T> {
    private subscribers: Set<Subscriber<T>> = new Set();

    public subscribe(subscriber: Subscriber<T>): void {
        this.subscribers.add(subscriber);
    }

    public unsubscribe(subscriber: Subscriber<T>): void {
        this.subscribers.delete(subscriber);
    }

    protected notify(context: T): void {
        for (const subscriber of this.subscribers) {
            subscriber.update(context);
        }
    }
}

// Конкретний видавець, який працює з числовими значеннями.
class TemperatureSensor extends Publisher<number> {
    private temperature: number = 0;

    public setTemperature(value: number): void {
        this.temperature = value;
        this.notify(this.temperature);
    }
}

// Підписник, який друкує температуру в консоль
class ConsoleDisplay implements Subscriber<number> {
    update(context: number): void {
        console.log(`Температура встановлена: ${context}°C`);
    }
}

// Підписник, який зберігає історію змін
class TemperatureLogger implements Subscriber<number> {
    private log: number[] = [];

    update(context: number): void {
        console.log(`Збережено температуру: ${context}°C в історію`);
        this.log.push(context);
    }

    public getHistory(): number[] {
        return [...this.log];
    }
}

const sensor = new TemperatureSensor();
const display = new ConsoleDisplay();
const logger = new TemperatureLogger();

sensor.subscribe(display);
sensor.subscribe(logger);

sensor.setTemperature(23);
sensor.setTemperature(24);
sensor.setTemperature(25);
