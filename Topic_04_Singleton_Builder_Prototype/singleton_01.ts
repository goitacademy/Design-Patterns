class AppConfig {
  private static instance: AppConfig;
  private configuration: Record<string, string>;

  private constructor() {
    // Імітація завантаження конфігурації 
    this.configuration = {
      apiUrl: "https://api.example.com",
      apiKey: "12345-ABCDE",
    };
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public get(key: string): string | undefined {
    return this.configuration[key];
  }

  public set(key: string, value: string): void {
    this.configuration[key] = value;
  }
}

// Отримуємо доступ до конфігурації через Singleton
const config1 = AppConfig.getInstance();
console.log(config1.get("apiUrl"));

// Змінюємо конфігурацію
config1.set("apiKey", "NEW-KEY-6789");

// Отримуємо конфігурацію повторно
const config2 = AppConfig.getInstance();
console.log(config2.get("apiKey"));

// Перевіряємо, чи два екземпляри дійсно є тим самим об'єктом
console.log(config1 === config2); 
