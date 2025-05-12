function LogMethod<This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return, // Оригінальна функція
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
): (this: This, ...args: Args) => Return { // Повертаємо функцію того ж типу

    const methodName = String(context.name); // Отримуємо ім'я методу з контексту

    // Створюємо нову функцію-обгортку. Саме ця функція замінить оригінальний метод.
    function loggedWrapper(this: This, ...args: Args): Return {
        // --- Логіка декоратору ---
        console.log(`🔍 Виклик методу ${methodName} з аргументами:`, args);
        // Викликаємо оригінальний метод, зберігаючи контекст 'this' та передаючи аргументи
        return originalMethod.apply(this, args);
        // --- Кінець логіки ---
    }

    // Повертаємо нашу функцію-обгортку.
    // TypeScript автоматично замінить оригінальний метод класу на цю функцію.
    return loggedWrapper;
}

class Calculator {
    @LogMethod
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);
