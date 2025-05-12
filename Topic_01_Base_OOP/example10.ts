class Customer {
    private id: number;
    private name: string;
    private orders: Order[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public addOrder(order: Order): void {
        this.orders.push(order);
    }

    public getOrders(): Order[] {
        return this.orders;
    }
}

class Order {
    private orderId: number;
    private orderDate: Date;
    private customer: Customer;
    private amount: number;

    constructor(orderId: number, customer: Customer, amount: number) {
        this.orderId = orderId;
        this.orderDate = new Date();
        this.customer = customer;
        this.amount = amount;

        // Встановлення двонаправленого зв'язку
        customer.addOrder(this);
    }

    public getOrderId(): number {
        return this.orderId;
    }

    public getOrderDate(): Date {
        return this.orderDate;
    }

    public getCustomer(): Customer {
        return this.customer;
    }

    public getAmount(): number {
        return this.amount;
    }

    public displayOrderInfo(): void {
        console.log(`Замовлення #${this.orderId} від ${this.orderDate.toLocaleDateString()}`);
        console.log(`Клієнт: ${this.customer.getName()}`);
        console.log(`Сума: ${this.amount} грн`);
    }
}

// Використання
const customer = new Customer(1, "Іван Петренко");
const order1 = new Order(101, customer, 1500);
const order2 = new Order(102, customer, 2300);

// Доступ до пов'язаних об'єктів через асоціацію
console.log(`Клієнт ${customer.getName()} має ${customer.getOrders().length} замовлень`);
order1.displayOrderInfo();