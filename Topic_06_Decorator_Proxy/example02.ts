interface Notifier {
    send(message: string): void;
  }
  
  class BasicNotifier implements Notifier {
    send(message: string): void {
      console.log(`Повідомлення: ${message}`);
    }
  }

  class NotifierDecorator implements Notifier {
    constructor(protected wrappee: Notifier) {}
  
    send(message: string): void {
      this.wrappee.send(message);
    }
  }

  class LoggerNotifier extends NotifierDecorator {
    send(message: string): void {
      console.log(`[INFO] Надсилається повідомлення: ${message}`);
      super.send(message);
    }
  }

  class EncryptedNotifier extends NotifierDecorator {
    send(message: string): void {
      const encrypted = this.encrypt(message);
      super.send(encrypted);
    }
  
    private encrypt(text: string): string {
      return Buffer.from(text).toString("base64");
    }
  }

  const notifier: Notifier = new LoggerNotifier(
    new EncryptedNotifier(
      new BasicNotifier()
    )
  );

  notifier.send("Користувач активований");