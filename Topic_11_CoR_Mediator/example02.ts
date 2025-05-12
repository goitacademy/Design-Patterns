type ComplaintType = 'technical' | 'payment' | 'general' | 'unknown';

interface Complaint {
    type: ComplaintType;
    message: string;
}

interface Handler {
    setNext(handler: Handler): Handler;
    handle(complaint: Complaint): void;
}

abstract class AbstractHandler implements Handler {
    private next: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.next = handler;
        return handler;
    }

    handle(complaint: Complaint): void {
        if (this.next) {
            this.next.handle(complaint);
        } else {
            console.log(`[Система] Скарга без обробника: ${complaint.message}`);
        }
    }
}

class TechnicalSupportHandler extends AbstractHandler {
    handle(complaint: Complaint): void {
        if (complaint.type === 'technical') {
            console.log(`[Технічна підтримка] ${complaint.message}`);
        } else {
            super.handle(complaint);
        }
    }
}

class PaymentSupportHandler extends AbstractHandler {
    handle(complaint: Complaint): void {
        if (complaint.type === 'payment') {
            console.log(`[Фінансовий відділ] ${complaint.message}`);
        } else {
            super.handle(complaint);
        }
    }
}

class GeneralSupportHandler extends AbstractHandler {
    handle(complaint: Complaint): void {
        if (complaint.type === 'general') {
            console.log(`[Загальні питання] ${complaint.message}`);
        } else {
            super.handle(complaint);
        }
    }
}

const tech = new TechnicalSupportHandler();
const finance = new PaymentSupportHandler();
const admin = new GeneralSupportHandler();

tech.setNext(finance).setNext(admin);

const complaints: Complaint[] = [
    { type: 'technical', message: 'Не працює кнопка входу' },
    { type: 'payment', message: 'Помилка списання коштів' },
    { type: 'general', message: 'Як змінити email?' },
    { type: 'unknown', message: 'Де мій пакет?' },
];

complaints.forEach((complaint) => tech.handle(complaint));

