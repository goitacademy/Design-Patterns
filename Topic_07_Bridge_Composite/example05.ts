// Типи для нашої функціональної системи
type Recipient = string;
type MessageSubject = string;
type MessageBody = string;

// Функціональний інтерфейс відправника (реалізація)
type SendFunction = (recipient: Recipient, subject: MessageSubject, body: MessageBody) => void;

// Функціональний інтерфейс форматувальника (абстракція)
type FormatFunction = (text: string) => { subject: MessageSubject, body: MessageBody };

// Функції-реалізації для різних каналів зв'язку
const emailSender: SendFunction = (recipient, subject, body) => {
    console.log(`Надсилається Email до ${recipient}`);
    console.log(`Тема: ${subject}`);
    console.log(`Текст повідомлення: ${body}`);
    console.log(`Email успішно надіслано!`);
};

const smsSender: SendFunction = (recipient, subject, body) => {
    console.log(`Надсилається SMS до ${recipient}`);
    // SMS зазвичай не має окремої теми, тому об'єднуємо
    const message = subject ? `${subject}: ${body}` : body;
    console.log(`Повідомлення: ${message}`);
    console.log(`SMS успішно надіслано!`);
};

const pushSender: SendFunction = (recipient, subject, body) => {
    console.log(`Надсилається Push-сповіщення на пристрій ${recipient}`);
    console.log(`Заголовок: ${subject}`);
    console.log(`Зміст: ${body}`);
    console.log(`Push-сповіщення успішно надіслано!`);
};

// Функції-абстракції для різних типів повідомлень
const systemFormatter: FormatFunction = (text) => ({
    subject: "Системне повідомлення",
    body: `[SYSTEM] ${text}`
});

const marketingFormatter: FormatFunction = (text) => ({
    subject: "Спеціальна пропозиція для вас!",
    body: `${text}\n\nВідпишіться від розсилки за посиланням...`
});

const securityFormatter: FormatFunction = (text) => ({
    subject: "УВАГА: Сповіщення безпеки",
    body: `⚠️ ${text}\n\nЯкщо це не ви, негайно зв'яжіться з підтримкою.`
});

// Функція-міст, яка поєднує форматування (абстракцію) та надсилання (реалізацію)
const createNotifier = (format: FormatFunction, send: SendFunction) => {
    return (recipient: Recipient, text: string) => {
        console.log(`Підготовка повідомлення...`);
        const { subject, body } = format(text);
        console.log(`Надсилання повідомлення...`);
        send(recipient, subject, body);
    };
};

// Демонстрація використання
// Створюємо різні комбінації типів повідомлень та каналів зв'язку
const systemEmailNotifier = createNotifier(systemFormatter, emailSender);
const marketingSmsNotifier = createNotifier(marketingFormatter, smsSender);
const securityPushNotifier = createNotifier(securityFormatter, pushSender);

// Використовуємо створені нотифікатори
console.log("\n--- Системне повідомлення електронною поштою ---");
systemEmailNotifier("user@example.com", "Сервер буде перезавантажено о 23:00");

console.log("\n--- Маркетингове повідомлення через SMS ---");
marketingSmsNotifier("+380501234567", "Знижка 50% на всі товари лише сьогодні!");

console.log("\n--- Повідомлення безпеки через Push ---");
securityPushNotifier("device-token-123", "Виявлено вхід до облікового запису з нового пристрою");