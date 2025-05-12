type DeliveryType = "standard" | "express" | "international";

class ShippingCostCalculator {
  constructor(private type: DeliveryType) {}

  calculateCost(weight: number): number {
    if (this.type === "standard") {
      return weight * 5;
    } else if (this.type === "express") {
      return weight * 10 + 20;
    } else if (this.type === "international") {
      return weight * 15 + 50;
    } else {
      throw new Error("Невідомий тип доставки");
    }
  }
}

const calculator = new ShippingCostCalculator("express");
console.log(calculator.calculateCost(2)); // 40
