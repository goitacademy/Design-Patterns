class DiscountCalculator {
  calculateDiscount(customerType: string, amount: number): number {
    if (customerType === 'regular') {
      return amount * 0.9;
    } else if (customerType === 'vip') {
      return amount * 0.8;
    } else if (customerType === 'new') {
      return amount * 0.95;
    }
    return amount;
  }
}
