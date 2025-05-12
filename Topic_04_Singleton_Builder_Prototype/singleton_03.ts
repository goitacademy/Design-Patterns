// Приватний клас, доступний лише всередині модуля
class AppConfigClass {
  private configuration: Record<string, string>;

  constructor() {
    console.log("Завантаження конфігурації при ініціалізації модуля");
    // Імітація завантаження конфігурації
    this.configuration = {
      apiUrl: "https://api.example.com",
      apiKey: "12345-ABCDE",
    };
  }

  get(key: string): string | undefined {
    return this.configuration[key];
  }

  set(key: string, value: string): void {
    this.configuration[key] = value;
  }
}

// Створення єдиного екземпляра всередині модуля
const appConfig = new AppConfigClass();

// Експорт екземпляра, а не класу
export default appConfig;