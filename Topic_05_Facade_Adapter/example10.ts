// Підсистема керування товарами
class InventoryService {
    reserveProduct(productId: string): void {
        console.log(`🔄 Резервування товару ${productId}`);
    }

    releaseProduct(productId: string): void {
        console.log(`❌ Скасування резерву товару ${productId}`);
    }
}

// Підсистема обробки платежів
class PaymentService {
    processPayment(account: string, amount: number): boolean {
        console.log(`💳 Проведення платежу ${amount} з рахунку ${account}`);
        return true;
    }
}

// Підсистема логістики
class ShippingService {
    arrangeDelivery(productId: string): void {
        console.log(`📦 Організація доставки для товару ${productId}`);
    }
}

// Підфасад для оформлення замовлення
class OrderProcessor {
    constructor(
        private inventory: InventoryService,
        private payment: PaymentService,
        private shipping: ShippingService
    ) { }

    processOrder(productId: string, account: string, amount: number): void {
        this.inventory.reserveProduct(productId);

        const success = this.payment.processPayment(account, amount);
        if (success) {
            this.shipping.arrangeDelivery(productId);
        } else {
            this.inventory.releaseProduct(productId);
        }
    }
}

// Центральний фасад
class ShopFacade {
    private inventory = new InventoryService();
    private payment = new PaymentService();
    private shipping = new ShippingService();
    private processor = new OrderProcessor(this.inventory, this.payment, this.shipping);

    order(productId: string, account: string, amount: number): void {
        this.processor.processOrder(productId, account, amount);
    }
}

// Клієнтський код
const shop = new ShopFacade();
shop.order("product-42", "user-acc", 299);