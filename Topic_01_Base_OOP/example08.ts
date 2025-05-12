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
    registerUser(username: string, email: string, paymentAmount: number): void {
        // Створення валідатора (залежність через локальну змінну)
        const validator = new EmailValidator();

        if (!validator.validate(email)) {
            throw new Error("Неправильний формат email");
        }

        console.log(`Реєстрація користувача: ${username}`);

        // Залежність через параметр методу
        const processor = new PaymentProcessor();
        if (processor.processPayment(paymentAmount)) {
            console.log("Оплата успішно оброблена");
        } else {
            console.log("Помилка обробки оплати");
        }
    }
}

// Використання
const registration = new RegistrationService();
registration.registerUser("user123", "user@example.com", 100);