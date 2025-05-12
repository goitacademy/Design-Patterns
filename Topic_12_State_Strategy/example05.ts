// Інтерфейс стану транзакції
interface TransactionState {
  process(transaction: Transaction): void;
}

// Конкретний стан: Ініційовано
class InitiatedState implements TransactionState {
  process(transaction: Transaction) {
    console.log("Транзакція ініційована. Очікує підтвердження.");
    transaction.setState(new PendingState());
  }
}

// Конкретний стан: Очікує підтвердження
class PendingState implements TransactionState {
  process(transaction: Transaction) {
    console.log("Транзакція очікує підтвердження.");
    transaction.setState(new CompletedState());
  }
}

// Конкретний стан: Успішно завершено
class CompletedState implements TransactionState {
  process(transaction: Transaction) {
    console.log("Транзакція успішно завершена.");
  }
}

// Контекст: Транзакція
class Transaction {
  private state: TransactionState;

  constructor() {
    this.state = new InitiatedState(); // Початковий стан
  }

  setState(state: TransactionState) {
    this.state = state;
  }

  process() {
    this.state.process(this);
  }
}

// Використання
const transaction = new Transaction();
transaction.process();
transaction.process();
transaction.process();
