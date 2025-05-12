type OrderState = "CREATED" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";

class Order {
  private state: OrderState;

  constructor() {
    this.state = "CREATED";
  }

  public pay(): void {
    if (this.state === "CREATED") {
      // Логіка оплати
      this.state = "PAID";
      console.log("Замовлення оплачено");
    } else if (this.state === "CANCELED") {
      console.log("Неможливо оплатити скасоване замовлення");
    } else {
      console.log("Замовлення вже оплачене");
    }
  }

  public ship(): void {
    if (this.state === "PAID") {
      // Логіка відправлення
      this.state = "SHIPPED";
      console.log("Замовлення відправлено");
    } else if (this.state === "CREATED") {
      console.log("Неможливо відправити неоплачене замовлення");
    } else {
      console.log("Неможливо відправити замовлення у поточному стані");
    }
  }

  public deliver(): void {
    if (this.state === "SHIPPED") {
      // Логіка доставки
      this.state = "DELIVERED";
      console.log("Замовлення доставлено");
    } else {
      console.log("Неможливо доставити замовлення у поточному стані");
    }
  }

  public cancel(): void {
    if (this.state === "CREATED" || this.state === "PAID") {
      // Логіка скасування
      this.state = "CANCELED";
      console.log("Замовлення скасовано");
    } else {
      console.log("Неможливо скасувати замовлення у поточному стані");
    }
  }
}

const order = new Order();
order.pay();
order.ship();
order.deliver();
