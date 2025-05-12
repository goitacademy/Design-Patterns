interface AsyncCommand {
    execute(): Promise<void>;
    undo?(): Promise<void>;
}

class FetchExchangeRateCommand implements AsyncCommand {
    constructor(private date: string) { }

    async execute(): Promise<void> {
        try {
            const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${this.date}`;
            const response = await fetch(url);
            const data = await response.json();

            const usd = data.exchangeRate.find((rate: any) => rate.currency === "USD");

            if (usd) {
                console.log(
                    `Дата: ${this.date} | USD/UAH: купівля — ${usd.purchaseRate.toFixed(2)}, продаж — ${usd.saleRate.toFixed(2)}`
                );
            } else {
                console.warn(`Дата: ${this.date} | Курс USD відсутній`);
            }
        } catch (error) {
            console.error(`Дата: ${this.date} | Помилка запиту`, error);
        }
    }
}

async function runParallel(commands: AsyncCommand[]): Promise<void> {
    const results = await Promise.allSettled(commands.map(cmd => cmd.execute()));

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Команда ${index + 1}: виконана`);
        } else {
            console.warn(`Команда ${index + 1}: помилка`);
        }
    });
}


runParallel([
    new FetchExchangeRateCommand("20.04.2024"),
    new FetchExchangeRateCommand("20.04.2025")
]);