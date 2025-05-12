class MathService {
    add(a: number, b: number): number {
        return a + b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    power(a: number, b: number): number {
        return Math.pow(a, b);
    }
}

type MathApi = {
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
    power(a: number, b: number): number;
};

function createLoggingMathService(): MathApi {
    const target = new MathService();

    return new Proxy<MathApi>(target, {
        get(obj, prop) {
            const method = obj[prop as keyof MathApi];
            if (typeof method === "function") {
                return function (this: unknown, ...args: unknown[]): unknown {
                    console.log(`Виклик ${String(prop)} з аргументами:`, args);
                    const result = (method as Function).apply(obj, args);
                    console.log(`Результат ${String(prop)}:`, result);
                    return result;
                };
            }
            return method;
        }
    });
}

const math = createLoggingMathService();

math.add(2, 3);
math.multiply(4, 5);
math.power(2, 8);
