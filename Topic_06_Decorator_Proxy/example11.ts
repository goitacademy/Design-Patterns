function Log<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, typeof originalMethod>
): typeof originalMethod {
    const name = String(context.name);
    return function (this: This, ...args: Args): Return {
        console.log(`📥 ${name} викликано з:`, args);
        return originalMethod.apply(this, args);
    };
}

function MeasureTime<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, typeof originalMethod>
): typeof originalMethod {
    const name = String(context.name);
    return function (this: This, ...args: Args): Return {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`⏱ ${name} завершено за ${Math.round(end - start)} мс`);
        return result;
    };
}

class Processor {
    @Log
    @MeasureTime
    execute(n: number): void {
        for (let i = 0; i < n; i++) { } // імітація навантаження
    }
}

new Processor().execute(1000000);
