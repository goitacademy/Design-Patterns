class InventoryService {
    private stock: Record<string, number> = {
        "product-42": 5,
        "product-99": 0,
    };

    reserveProduct(productId: string): boolean {
        if (this.stock[productId] > 0) {
            this.stock[productId]--;
            console.log(`✅ Резервовано ${productId}`);
            return true;
        }
        console.log(`⚠️ Немає в наявності: ${productId}`);
        return false;
    }

    releaseProduct(productId: string): void {
        this.stock[productId]++;
        console.log(`↩️ Резерв скасовано для ${productId}`);
    }

    checkAvailability(productId: string): boolean {
        return this.stock[productId] > 0;
    }
}

class PaymentService {
    process(account: string, amount: number): boolean {
        console.log(`💰 Оплата ${amount} з рахунку ${account}`);
        return true;
    }
}

class ShippingService {
    ship(productId: string): void {
        console.log(`🚚 Відправка товару ${productId}`);
    }
}

class ExtendedShopFacade {
    private inventory = new InventoryService();
    private payment = new PaymentService();
    private shipping = new ShippingService();

    order(productId: string, account: string, amount: number): void {
        const reserved = this.inventory.reserveProduct(productId);
        if (!reserved) return;

        const paid = this.payment.process(account, amount);
        if (paid) {
            this.shipping.ship(productId);
        } else {
            this.inventory.releaseProduct(productId);
        }
    }

    getInventoryService(): InventoryService {
        return this.inventory;
    }
}

// Клієнтський код
const shop = new ExtendedShopFacade();

// Стандартна операція через фасад
shop.order("product-42", "user-acc", 299);

// Доступ до підсистеми напряму
const inventory = shop.getInventoryService();
console.log("Доступність товару:", inventory.checkAvailability("product-99"));
