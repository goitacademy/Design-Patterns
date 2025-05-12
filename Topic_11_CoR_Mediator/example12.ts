// Підсистема управління товарами
class Inventory {
    reserve(productId: string): void {
        console.log(`[Інвентар] Товар ${productId} зарезервовано на складі`);
    }

    release(productId: string): void {
        console.log(`[Інвентар] Резервування товару ${productId} скасовано`);
    }
}

// Підсистема обробки платежів
class Payment {
    process(accountId: string, amount: number): boolean {
        console.log(
            `[Платіж] Спроба списання ${amount}₴ з рахунку ${accountId}`,
        );
        return true;
    }
}

// Підсистема управління доставкою
class Delivery {
    schedule(productId: string): void {
        console.log(`[Доставка] Заплановано доставку товару ${productId}`);
    }
}

// Медіатор для управління товарами
class InventoryMediator {
    constructor(private readonly inventory: Inventory) {}

    reserveItem(productId: string): void {
        this.inventory.reserve(productId);
    }

    cancelItem(productId: string): void {
        this.inventory.release(productId);
    }
}

// Медіатор для управління платежами
class PaymentMediator {
    constructor(private readonly payment: Payment) {}

    charge(accountId: string, amount: number): boolean {
        return this.payment.process(accountId, amount);
    }
}

// Медіатор для управління доставкою
class DeliveryMediator {
    constructor(private readonly delivery: Delivery) {}

    ship(productId: string): void {
        this.delivery.schedule(productId);
    }
}

/**
 * Головний процес оформлення замовлення
 * 1. Резервує товар на складі
 * 2. Проводить оплату
 * 3. Якщо оплата успішна - планує доставку
 * 4. Якщо оплата неуспішна - знімає резервування
 */
function placeOrder(
    productId: string,
    accountId: string,
    amount: number,
    inventoryMediator: InventoryMediator,
    paymentMediator: PaymentMediator,
    deliveryMediator: DeliveryMediator,
): void {
    console.log('\n[Замовлення] Початок оформлення замовлення');

    inventoryMediator.reserveItem(productId);
    const success = paymentMediator.charge(accountId, amount);

    if (success) {
        deliveryMediator.ship(productId);
        console.log('[Замовлення] Замовлення успішно оформлено');
    } else {
        inventoryMediator.cancelItem(productId);
        console.log(
            '[Замовлення] Помилка оформлення замовлення: платіж відхилено',
        );
    }
}

// Створення підсистем
const inventory = new Inventory();
const payment = new Payment();
const delivery = new Delivery();

// Створення медіаторів для кожної підсистеми
const inventoryMediator = new InventoryMediator(inventory);
const paymentMediator = new PaymentMediator(payment);
const deliveryMediator = new DeliveryMediator(delivery);

// Демонстрація процесу оформлення замовлення
placeOrder(
    'PRD-123', // ID товару
    'ACC-456', // ID акаунту
    1500, // Сума замовлення в гривнях
    inventoryMediator,
    paymentMediator,
    deliveryMediator,
);
