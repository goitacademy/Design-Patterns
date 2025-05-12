abstract class PaymentProcessor {
    abstract processPayment(amount: number): void;
    abstract refundPayment(transactionId: string): void;

    validateAmount(amount: number): boolean {
        if (amount <= 0) {
            throw new Error("Сума платежу повинна бути більше 0.");
        }
        return true;
    }
}

class StripeProcessor extends PaymentProcessor {
    processPayment(amount: number): void {
        this.validateAmount(amount); // перевірка з абстрактного класу
        console.log(`Обробляємо платіж через Stripe на суму ${amount}.`);
    }

    refundPayment(transactionId: string): void {
        console.log(`Повернення Stripe-платежу з ID: ${transactionId}`);
    }
}

const stripe = new StripeProcessor();
stripe.processPayment(200);
stripe.refundPayment("trx123456");
