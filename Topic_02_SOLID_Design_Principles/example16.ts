interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(message);
  }
}

class FileLogger implements ILogger {
  log(message: string): void {
    // логіка запису в файл
  }
}

class UserManager {
  constructor(private logger: ILogger) { }

  createUser(username: string): void {
    // створення користувача
    this.logger.log(`Користувач ${username} створений.`);
  }
}

// Використання:
const manager = new UserManager(new ConsoleLogger());
manager.createUser('Андрій');
