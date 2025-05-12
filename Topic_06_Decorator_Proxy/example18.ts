// import fetch from "node-fetch";

class CurrencyRateService {
    async getRate(currency: string, date: Date): Promise<number> {
        const formattedDate = date.toLocaleDateString("uk-UA").replace(/\//g, ".");

        console.log(`Запит до API для дати ${formattedDate}`);

        const url = `https://api.privatbank.ua/p24api/exchange_rates?json&date=${formattedDate}`;
        const response = await fetch(url);
        const data = await response.json();

        const rateInfo = data.exchangeRate.find((rate: any) => rate.currency === currency.toUpperCase());

        if (!rateInfo || typeof rateInfo.saleRateNB !== "number") {
            throw new Error(`Не вдалося отримати курс для валюти ${currency}`);
        }

        return rateInfo.saleRateNB;
    }
}

type CurrencyApi = {
    getRate(currency: string, date: Date): Promise<number>;
};

function createCachedCurrencyService(): CurrencyApi {
    const target = new CurrencyRateService();
    const cache = new Map<string, number>();

    return new Proxy<CurrencyApi>(target, {
        get(obj, prop) {
            if (prop === "getRate") {
                return async function (this: unknown, currency: string, date: Date): Promise<number> {
                    const key = `${currency.toUpperCase()}_${date.toLocaleDateString("uk-UA")}`;
                    if (cache.has(key)) {
                        console.log(`Повертаємо курс ${currency} за ${key.split("_")[1]} з кешу`);
                        return cache.get(key)!;
                    }
                    const rate = await obj.getRate(currency, date);
                    cache.set(key, rate);
                    return rate;
                };
            }
            return Reflect.get(obj, prop);
        }
    });
}

(async () => {
    const currencyService = createCachedCurrencyService();

    const date = new Date("2024-04-12");

    const usd1 = await currencyService.getRate("USD", date);
    console.log("Курс USD:", usd1);

    const eur1 = await currencyService.getRate("EUR", date);
    console.log("Курс EUR:", eur1);

    const usd2 = await currencyService.getRate("USD", date);
    console.log("Курс USD:", usd2);
})();
