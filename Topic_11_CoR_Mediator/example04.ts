interface TimeOfDay {
    hours: number;
    minutes: number;
}

interface AccessRequest {
    userId: string;
    role: string;
    resource: string;
    time: TimeOfDay;
}

enum Priority {
    HIGH = 100,
    MEDIUM_HIGH = 75,
    MEDIUM = 50,
    LOW = 10
}

interface AccessRule {
    priority: Priority;
    canHandle(request: AccessRequest): boolean;
    handle(request: AccessRequest): AccessResult;
}

enum AccessResult {
    GRANTED,
    DENIED,
    PARTIALLY_GRANTED
}

class AccessControlSystem {
    private rules: AccessRule[] = [];

    registerRule(rule: AccessRule): void {
        this.rules.push(rule);
        // Сортуємо правила за спаданням пріоритету
        this.rules.sort((a, b) => b.priority - a.priority);
    }

    processRequest(request: AccessRequest): AccessResult {
        // Журналювання запиту
        console.log(`[${new Date().toISOString()}] [ACCESS_CONTROL] Обробка запиту: ${request.role} -> ${request.resource}`);

        // Проходимо по правилах у порядку пріоритету
        for (const rule of this.rules) {
            if (rule.canHandle(request)) {
                const result = rule.handle(request);
                // Якщо правило дало конкретний результат, повертаємо його
                return result;
            }
        }

        // Якщо жодне правило не спрацювало, за замовчуванням відмовляємо в доступі
        console.log(`[${new Date().toISOString()}] [ACCESS_CONTROL] Доступ заборонено за замовчуванням: ${request.role} -> ${request.resource}`);
        return AccessResult.DENIED;
    }
}

class AdminAccessRule implements AccessRule {
    priority = Priority.HIGH;

    canHandle(request: AccessRequest): boolean {
        return request.role === 'admin';
    }

    handle(request: AccessRequest): AccessResult {
        console.log(`[${new Date().toISOString()}] [ADMIN_RULE] Доступ дозволено адміністратору до ресурсу ${request.resource}`);
        return AccessResult.GRANTED;
    }
}

class BusinessHoursRule implements AccessRule {
    priority = Priority.MEDIUM;

    canHandle(request: AccessRequest): boolean {
        return request.role === 'user' && (request.time.hours >= 9 && request.time.hours <= 17);
    }

    handle(request: AccessRequest): AccessResult {
        console.log(`[${new Date().toISOString()}] [BUSINESS_HOURS_RULE] Доступ дозволено користувачу у робочий час до ресурсу ${request.resource}`);
        return AccessResult.GRANTED;
    }
}

class GuestAccessRule implements AccessRule {
    priority = Priority.LOW;

    canHandle(request: AccessRequest): boolean {
        return request.role === 'guest';
    }

    handle(request: AccessRequest): AccessResult {
        console.log(`[${new Date().toISOString()}] [GUEST_RULE] Гостю надано обмежений доступ до ресурсу ${request.resource}`);
        return AccessResult.PARTIALLY_GRANTED;
    }
}

class SensitiveResourceRule implements AccessRule {
    priority = Priority.MEDIUM_HIGH;

    canHandle(request: AccessRequest): boolean {
        // Перевіряємо, чи ресурс є чутливим і чи користувач не адміністратор
        return request.resource.startsWith('secure-') && request.role !== 'admin';
    }

    handle(request: AccessRequest): AccessResult {
        console.log(`[${new Date().toISOString()}] [SENSITIVE_RULE] Доступ заборонено до захищеного ресурсу ${request.resource}`);
        return AccessResult.DENIED;
    }
}

// Створюємо систему контролю доступу
const accessControl = new AccessControlSystem();

// Реєструємо правила в будь-якому порядку - вони будуть відсортовані за пріоритетом
accessControl.registerRule(new BusinessHoursRule());
accessControl.registerRule(new GuestAccessRule());
accessControl.registerRule(new AdminAccessRule());
accessControl.registerRule(new SensitiveResourceRule());

// Створюємо тестові запити
const requests: AccessRequest[] = [
    { userId: '1', role: 'admin', resource: 'dashboard', time: { hours: 22, minutes: 17 } },
    { userId: '2', role: 'user', resource: 'report', time: { hours: 11, minutes: 30 } },
    { userId: '3', role: 'guest', resource: 'documentation', time: { hours: 14, minutes: 15 } },
    { userId: '4', role: 'user', resource: 'secure-zone', time: { hours: 10, minutes: 0 } },
    { userId: '5', role: 'user', resource: 'report', time: { hours: 20, minutes: 45 } },
    { userId: '6', role: 'admin', resource: 'secure-zone', time: { hours: 23, minutes: 0 } }
];

// Обробляємо запити
console.log('[ACCESS_CONTROL] Початок обробки запитів доступу');
requests.forEach((request, index) => {
    console.log(`\n[ACCESS_CONTROL] Запит ${index + 1}: ${request.role} -> ${request.resource} о ${request.time.hours}:${request.time.minutes.toString().padStart(2, '0')}`);
    const result = accessControl.processRequest(request);

    // Виводимо результат обробки
    let resultText = '';
    switch (result) {
        case AccessResult.GRANTED:
            resultText = 'ДОЗВОЛЕНО';
            break;
        case AccessResult.DENIED:
            resultText = 'ЗАБОРОНЕНО';
            break;
        case AccessResult.PARTIALLY_GRANTED:
            resultText = 'ЧАСТКОВО ДОЗВОЛЕНО';
            break;
    }
    console.log(`[ACCESS_CONTROL] Результат: ${resultText}`);
});

console.log('\n[ACCESS_CONTROL] Завершення обробки запитів');