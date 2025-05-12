
interface ILogger {
  log(message: string, level: "info" | "error"): void;
}

class LegacyLogger {
  writeLog(message: string): void {
    console.log(`[Legacy] ${message}`);
  }
}


class ClassAdapter extends LegacyLogger implements ILogger {
  writeLog(message: string): void {
    console.log(`[Legacy] ${message}`);
  }

  log(message: string, level: "info" | "error"): void {
    this.writeLog(`[${level.toUpperCase()}] ${message}`);
  }
}

const logger = new ClassAdapter();
logger.log("Системна подія", "info");

