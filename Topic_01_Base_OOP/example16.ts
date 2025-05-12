interface PaymentSystem {
    processPayment(amount: number): void;
    refundPayment(paymentId: string): void;
}

class PayPalPayment implements PaymentSystem {
    processPayment(amount: number): void {
        console.log(`Обробка PayPal-платежу на суму ${amount} грн.`);
    }

    refundPayment(transactionId: string): void {
        console.log(`Повернення платежу PayPal із номером: ${transactionId}`);
    }
}

class StripePayment implements PaymentSystem {
    processPayment(amount: number): void {
        console.log(`Обробка Stripe-платежу на суму ${amount}.`);
    }

    refundPayment(transactionId: string): void {
        console.log(`Повернення Stripe-платежу з ID: ${transactionId}`);
    }
}

function executePayment(paymentSystem: PaymentSystem, amount: number): void {
    paymentSystem.processPayment(amount);
}

const paypal = new PayPalPayment();
const stripe = new StripePayment();

paypal.processPayment(100); // Обробка PayPal-платежу на суму 100.
stripe.processPayment(150); // Обробка Stripe-платежу на суму 150.