// Декоратор у новому стилі (ECMAScript/TypeScript 5.x+)
function Time<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
): (this: This, ...args: Args) => Return {
    const methodName = String(context.name);
    function timedWrapper(this: This, ...args: Args): Return {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`⏱ Метод ${methodName} виконувався ${Math.round(end - start)} мс`);
        return result;
    }
    return timedWrapper;
}

class HeavyOperation {
    @Time
    compute(): void {
        for (let i = 0; i < 1e6; i++) { } // симуляція навантаження
    }
}

new HeavyOperation().compute();
// Пояснення:
// - Декоратор Time оголошений у новому стилі (signature для ECMAScript decorators).
// - Оригінальний метод передається першим аргументом, контекст — другим.
// - Повертається нова функція-обгортка, яка вимірює час виконання методу.
