// Інтерфейс реалізації (Implementor)
interface MessageSender {
    send(recipient: string, subject: string, body: string): void;
}

// Конкретні реалізації (ConcreteImplementor)
class EmailSender implements MessageSender {
    send(recipient: string, subject: string, body: string): void {
        console.log(`Надсилається Email до ${recipient}`);
        console.log(`Тема: ${subject}`);
        console.log(`Текст повідомлення: ${body}`);
        console.log(`Email успішно надіслано!`);
    }
}

class SMSSender implements MessageSender {
    send(recipient: string, subject: string, body: string): void {
        console.log(`Надсилається SMS до ${recipient}`);
        // SMS часто не містить теми, тому об'єднуємо тему й основний текст
        const message = subject ? `${subject}: ${body}` : body;
        console.log(`Повідомлення: ${message}`);
        console.log(`SMS успішно надіслано!`);
    }
}

class PushSender implements MessageSender {
    send(recipient: string, subject: string, body: string): void {
        console.log(`Надсилається Push-сповіщення пристрою ${recipient}`);
        console.log(`Заголовок: ${subject}`);
        console.log(`Зміст: ${body}`);
        console.log(`Push-сповіщення успішно надіслано!`);
    }
}

// Абстракція (Abstraction)
abstract class MessageNotifier {
    // Посилання на об'єкт реалізації
    protected sender: MessageSender;

    constructor(sender: MessageSender) {
        this.sender = sender;
    }

    // Абстрактний метод для надсилання повідомлень, який буде реалізовано в підкласах
    abstract notify(recipient: string, messageText: string): void;
}

// Розширені абстракції (RefinedAbstraction)
class SystemNotification extends MessageNotifier {
    notify(recipient: string, messageText: string): void {
        console.log("Формування системного повідомлення...");
        const subject = "Системне повідомлення";
        const formattedMessage = `[SYSTEM] ${messageText}`;
        this.sender.send(recipient, subject, formattedMessage);
    }
}

class MarketingNotification extends MessageNotifier {
    notify(recipient: string, messageText: string): void {
        console.log("Формування маркетингового повідомлення...");
        const subject = "Спеціальна пропозиція для вас!";
        const formattedMessage = `${messageText}\n\nВідпишіться від розсилки за посиланням...`;
        this.sender.send(recipient, subject, formattedMessage);
    }
}

class SecurityNotification extends MessageNotifier {
    notify(recipient: string, messageText: string): void {
        console.log("Формування повідомлення безпеки...");
        const subject = "УВАГА: Сповіщення безпеки";
        const formattedMessage = `⚠️ ${messageText}\n\nЯкщо це не ви, негайно зв'яжіться з підтримкою.`;
        this.sender.send(recipient, subject, formattedMessage);
    }
}

// Клієнтський код
function demonstrateNotificationSystem(): void {
    // Створюємо реалізації каналів зв'язку
    const emailSender = new EmailSender();
    const smsSender = new SMSSender();
    const pushSender = new PushSender();

    // Створюємо повідомлення різних типів з різними каналами
    const systemEmailNotification = new SystemNotification(emailSender);
    const marketingSmsNotification = new MarketingNotification(smsSender);
    const securityPushNotification = new SecurityNotification(pushSender);

    console.log("\n--- Системне повідомлення електронною поштою ---");
    systemEmailNotification.notify("user@example.com", "Профілактичні роботи заплановано на неділю.");

    console.log("\n--- Маркетингове повідомлення через SMS ---");
    marketingSmsNotification.notify("+380501234567", "Знижка 20% на всі товари лише сьогодні!");

    console.log("\n--- Повідомлення безпеки через Push ---");
    securityPushNotification.notify("device-token-123", "Виявлено вхід до облікового запису з нового пристрою.");
}

demonstrateNotificationSystem();