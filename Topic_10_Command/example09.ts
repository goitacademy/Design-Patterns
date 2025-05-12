interface ExchangeRate {
    date: string;
    usd: {
        currency: string;
        purchaseRate: number;
        saleRate: number;
    };
}

interface AsyncCommand<T = any> {
    execute(): Promise<T>;
}

class FetchExchangeRateCommand implements AsyncCommand<ExchangeRate> {
    constructor(private date: string) { }

    async execute(): Promise<ExchangeRate> {
        const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${this.date}`;
        const response = await fetch(url);
        const data = await response.json();

        const usd = data.exchangeRate.find((rate: any) => rate.currency === "USD");

        if (!usd) {
            throw new Error(`Курс USD відсутній для дати ${this.date}`);
        }

        return { date: this.date, usd };
    }
}

type CommandResult<T> = {
    index: number;
    status: "success" | "error";
    data?: T;
    error?: string;
}

async function runParallel<T extends AsyncCommand<R>, R>(commands: T[]): Promise<CommandResult<R>[]> {
    const results = await Promise.allSettled(commands.map(cmd => cmd.execute()));

    return results.map((result, index): CommandResult<R> => {
        if (result.status === "fulfilled") {
            return {
                index,
                status: "success",
                data: result.value
            };
        }
        return {
            index,
            status: "error",
            error: result.reason instanceof Error ? result.reason.message : String(result.reason)
        };
    });
}

// Приклад використання
const commands = [
    new FetchExchangeRateCommand("20.04.2024"),
    new FetchExchangeRateCommand("20.04.2025")
];

runParallel<FetchExchangeRateCommand, ExchangeRate>(commands).then(results => {
    results.forEach(result => {
        if (result.status === "success" && result.data) {
            const { date, usd } = result.data;
            console.log(
                `Курс [${date}]: USD/UAH ${usd.purchaseRate.toFixed(2)}/${usd.saleRate.toFixed(2)}`
            );
        } else {
            console.warn(`Помилка для команди ${result.index + 1}: ${result.error}`);
        }
    });
});
