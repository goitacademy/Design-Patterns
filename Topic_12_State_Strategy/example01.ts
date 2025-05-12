type _RequestState = "pending" | "processing" | "completed" | "failed";

class _HttpRequest {
  private state: _RequestState = "pending";
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  start(): void {
    if (this.state === "pending") {
      console.log(`Розпочато обробку запиту до ${this.url}...`);
      this.state = "processing";
    } else {
      console.log(
        `Неможливо розпочати: запит до ${this.url} не перебуває у стані 'pending'.`
      );
    }
  }

  complete(): void {
    if (this.state === "processing") {
      console.log(`Запит до ${this.url} успішно завершено.`);
      this.state = "completed";
    } else {
      console.log(
        `Завершення для ${this.url} можливе лише зі стану 'processing'.`
      );
    }
  }

  fail(): void {
    if (this.state === "processing") {
      console.log(`Запит до ${this.url} завершено з помилкою.`);
      this.state = "failed";
    } else {
      console.log(`Неможливо перевести запит до ${this.url} у стан 'failed'.`);
    }
  }

  retry(): void {
    if (this.state === "failed") {
      console.log(`Повторна спроба запиту до ${this.url}...`);
      this.state = "pending";
    } else {
      console.log(
        `Повторна спроба для ${this.url} можлива лише після помилки.`
      );
    }
  }
}

console.log("\n--------------------------------");
const httpRequest = new HttpRequest("https://api.example.com/data");
httpRequest.start();
httpRequest.complete();
console.log("\n--------------------------------");
const httpRequest2 = new HttpRequest("https://api.example.com/user");
httpRequest2.start();
httpRequest2.fail();
httpRequest2.retry();
httpRequest2.start();
httpRequest2.complete();
