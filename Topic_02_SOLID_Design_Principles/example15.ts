class ConsoleLogger {
  log(message: string): void {
    console.log(message);
  }
}

class UserManager {
  private logger = new ConsoleLogger();

  createUser(username: string): void {
    // створення користувача
    this.logger.log(`Користувач ${username} створений.`);
  }
}
