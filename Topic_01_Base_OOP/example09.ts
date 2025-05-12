class EmailValidator {
    validate(email: string): boolean {
        // Перевірка формату email через регулярні вирази
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

class PaymentProcessor {
    processPayment(amount: number): boolean {
        // Логіка обробки платежу
        console.log(`Обробка платежу на суму ${amount}`);
        return true;
    }
}

class RegistrationService {
    // Залежності передаються через конструктор
    constructor(
        private validator: EmailValidator,
        private processor: PaymentProcessor
    ) { }

    registerUser(username: string, email: string, paymentAmount: number): void {
        if (!this.validator.validate(email)) {
            throw new Error("Неправильний формат email");
        }

        console.log(`Реєстрація користувача: ${username}`);

        if (this.processor.processPayment(paymentAmount)) {
            console.log("Оплата успішно оброблена");
        } else {
            console.log("Помилка обробки оплати");
        }
    }
}

// Використання з впровадженням залежностей
const validator = new EmailValidator();
const processor = new PaymentProcessor();
const registration = new RegistrationService(validator, processor);
registration.registerUser("user123", "user@example.com", 100);