// Цільовий інтерфейс
interface ILogger {
  log(message: string, level: "info" | "error"): void;
}

// Стара реалізація, яку потрібно адаптувати
class LegacyLogger {
  writeLog(message: string): void {
    console.log(`[Legacy] ${message}`);
  }
}

// Адаптер, який реалізує цільовий інтерфейс та делегує виклики LegacyLogger
class LoggerAdapter implements ILogger {
  constructor(private legacyLogger: LegacyLogger) { }

  log(message: string, level: "info" | "error"): void {
    this.legacyLogger.writeLog(`[${level.toUpperCase()}] ${message}`);
  }
}

// Клієнтський код працює з адаптером
function executeLogging(logger: ILogger): void {
  logger.log("Критична помилка", "error");
}

const legacy = new LegacyLogger();
const adapter = new LoggerAdapter(legacy);
executeLogging(adapter);
