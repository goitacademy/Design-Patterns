interface Discount {
  apply(amount: number): number;
}

class RegularDiscount implements Discount {
  apply(amount: number): number {
    return amount * 0.9;
  }
}

class VIPDiscount implements Discount {
  apply(amount: number): number {
    return amount * 0.8;
  }
}

class NewCustomerDiscount implements Discount {
  apply(amount: number): number {
    return amount * 0.95;
  }
}

class DiscountCalculator {
  constructor(private discountStrategy: Discount) { }

  calculate(amount: number): number {
    return this.discountStrategy.apply(amount);
  }
}

const calculator = new DiscountCalculator(new VIPDiscount());
console.log(calculator.calculate(100)); 
