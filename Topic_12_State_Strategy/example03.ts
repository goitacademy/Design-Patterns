interface RequestState {
  start(): Promise<void>;
  complete(): Promise<void>;
  fail(): Promise<void>;
  retry(): Promise<void>;
}

class HttpRequest {
  private state!: RequestState;
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
    this.setState(new PendingState(this));
  }

  setState(state: RequestState): void {
    this.state = state;
  }

  getUrl(): string {
    return this.url;
  }

  async start(): Promise<void> {
    await this.state.start();
  }

  async complete(): Promise<void> {
    await this.state.complete();
  }

  async fail(): Promise<void> {
    await this.state.fail();
  }

  async retry(): Promise<void> {
    await this.state.retry();
  }
}

class PendingState implements RequestState {
  constructor(private readonly request: HttpRequest) {}

  async start(): Promise<void> {
    // Явно викликаємо start() на новому state, щоб уникнути recursion hell
    const newState = new ProcessingState(this.request);
    this.request.setState(newState);
    await newState.start();
  }

  async complete(): Promise<void> {
    console.log(`Запит ще не розпочато`);
  }

  async fail(): Promise<void> {
    console.log(`Неможливо завершити невиконаний запит`);
  }

  async retry(): Promise<void> {
    console.log(`Повторна спроба не потрібна — запит ще не виконано`);
  }
}

class ProcessingState implements RequestState {
  constructor(private readonly request: HttpRequest) {}

  async start(): Promise<void> {
    try {
      const response = await fetch(this.request.getUrl());
      if (!response.ok) {
        throw new Error("Помилка запиту");
      }
      const data = await response.json();
      console.log(
        `Отримано відповідь: ${JSON.stringify(data).slice(0, 100)}...`
      );
      this.request.setState(new CompletedState(this.request));
    } catch (error) {
      console.log(`Запит завершився з помилкою: ${String(error)}`);
      this.request.setState(new FailedState(this.request));
    }
  }

  async complete(): Promise<void> {
    console.log(`Очікуємо завершення запиту`);
  }

  async fail(): Promise<void> {
    console.log(`Очікуємо завершення запиту`);
  }

  async retry(): Promise<void> {
    console.log(`Неможливо перезапустити запит під час обробки`);
  }
}

class CompletedState implements RequestState {
  constructor(private readonly request: HttpRequest) {}

  async start(): Promise<void> {
    console.log(`Запит уже завершено`);
  }

  async complete(): Promise<void> {
    console.log(`Запит уже завершено`);
  }

  async fail(): Promise<void> {
    console.log(`Завершений запит не може завершитись помилкою`);
  }

  async retry(): Promise<void> {
    const newState = new PendingState(this.request);
    this.request.setState(newState);
    await newState.start();
  }
}

class FailedState implements RequestState {
  constructor(private readonly request: HttpRequest) {}

  async start(): Promise<void> {
    console.log(`Запит завершено з помилкою. Використайте retry.`);
  }

  async complete(): Promise<void> {
    console.log(`Помилковий запит не можна завершити`);
  }

  async fail(): Promise<void> {
    console.log(`Запит уже завершено з помилкою`);
  }

  async retry(): Promise<void> {
    const newState = new PendingState(this.request);
    this.request.setState(newState);
    await newState.start();
  }
}

(async () => {
  console.log("\n--- Викликаємо з валідним URL ---");
  const request = new HttpRequest(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  await request.start();

  console.log("\n--- Викликаємо з невалідним URL ---");
  const request2 = new HttpRequest("https://jsonplaceholder.typicode.com/404");
  await request2.start();
})();
