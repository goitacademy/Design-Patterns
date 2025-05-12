// Інтерфейс стану замовлення
interface OrderState {
  proceed(order: Order): void;
}

// Конкретний стан: Створено
class CreatedState implements OrderState {
  proceed(order: Order) {
    console.log("Замовлення створено. Очікує оплати.");
    order.setState(new PaidState());
  }
}

// Конкретний стан: Оплачено
class PaidState implements OrderState {
  proceed(order: Order) {
    console.log("Замовлення оплачено. Готується до відправки.");
    order.setState(new ShippedState());
  }
}

// Конкретний стан: Відправлено
class ShippedState implements OrderState {
  proceed(order: Order) {
    console.log("Замовлення відправлено. Очікує доставки.");
    order.setState(new DeliveredState());
  }
}

// Конкретний стан: Доставлено
class DeliveredState implements OrderState {
  proceed(order: Order) {
    console.log("Замовлення доставлено.");
  }
}

// Контекст: Замовлення
class Order {
  private state: OrderState;

  constructor() {
    this.state = new CreatedState(); // Початковий стан
  }

  setState(state: OrderState) {
    this.state = state;
  }

  proceed() {
    this.state.proceed(this);
  }
}

// Використання
const order = new Order();
order.proceed(); // Виведе: "Замовлення створено. Очікує оплати."
order.proceed(); // Виведе: "Замовлення оплачено. Готується до відправки."
order.proceed(); // Виведе: "Замовлення відправлено. Очікує доставки."
order.proceed(); // Виведе: "Замовлення доставлено."
