type User = {
  name: string;
  age: number;
  registeredAt: Date;
};

const users: User[] = [
  { name: "Анна", age: 28, registeredAt: new Date("2023-05-10") },
  { name: "Богдан", age: 22, registeredAt: new Date("2023-01-02") },
  { name: "Катерина", age: 35, registeredAt: new Date("2022-11-20") },
  { name: "Дмитро", age: 28, registeredAt: new Date("2023-03-15") },
];

interface SortStrategy {
  sort(users: User[]): User[];
}

class NameSortStrategy implements SortStrategy {
  sort(users: User[]): User[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }
}

class AgeSortStrategy implements SortStrategy {
  sort(users: User[]): User[] {
    return [...users].sort((a, b) => a.age - b.age);
  }
}

class RegistrationDateSortStrategy implements SortStrategy {
  sort(users: User[]): User[] {
    return [...users].sort(
      (a, b) => a.registeredAt.getTime() - b.registeredAt.getTime()
    );
  }
}

class UserSorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  public executeSort(users: User[]): User[] {
    return this.strategy.sort(users);
  }
}

const sorter = new UserSorter(new NameSortStrategy());
console.log("Сортування за ім’ям:");
console.table(sorter.executeSort(users));

sorter.setStrategy(new AgeSortStrategy());
console.log("Сортування за віком:");
console.table(sorter.executeSort(users));

sorter.setStrategy(new RegistrationDateSortStrategy());
console.log("Сортування за датою реєстрації:");
console.table(sorter.executeSort(users));
