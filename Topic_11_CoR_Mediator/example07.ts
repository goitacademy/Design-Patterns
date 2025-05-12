interface AppRequest {
    path: string;
    headers: { [key: string]: string };
    user?: string;
}

interface AppResponse {
    status: number;
    body: string;
}

type Middleware = (req: AppRequest, res: AppResponse, next: () => void) => void;

function createMiddlewareChain(
    middlewares: Middleware[],
): (req: AppRequest, res: AppResponse) => void {
    return (req, res) => {
        let index = -1;

        function dispatch(i: number): void {
            if (i <= index) throw new Error('next() викликано двічі');
            index = i;
            const middleware = middlewares[i];
            if (middleware) {
                middleware(req, res, () => dispatch(i + 1));
            }
        }

        dispatch(0);
    };
}

const logger: Middleware = (req, res, next) => {
    console.log('\n[Logger] Початок обробки запиту...');
    console.log(`[Logger] Шлях запиту: ${req.path}`);
    console.log(`[Logger] Заголовки: ${JSON.stringify(req.headers, null, 2)}`);
    next();
    console.log('[Logger] Запит оброблено');
};

const auth: Middleware = (req, res, next) => {
    console.log('\n[Auth] Перевірка авторизації...');
    if (!req.headers.authorization) {
        console.log('[Auth] Помилка: відсутній токен авторизації');
        res.status = 401;
        res.body = 'Неавторизовано';
        return;
    }
    console.log('[Auth] Токен знайдено, встановлення користувача...');
    req.user = 'admin';
    next();
    console.log('[Auth] Авторизацію пройдено успішно');
};

const handler: Middleware = (req, res, next) => {
    console.log('\n[Handler] Обробка запиту...');
    res.status = 200;
    res.body = `Вітаємо, ${req.user}`;
    console.log(`[Handler] Відповідь підготовлено: ${res.body}`);
};

const app = createMiddlewareChain([logger, auth, handler]);

console.log('Запуск обробки запиту...');
console.log('-'.repeat(50));

// Успішний запит
const reqSuccess: AppRequest = {
    path: '/dashboard',
    headers: { authorization: 'Bearer token' },
};

const resSuccess: AppResponse = {
    status: 0,
    body: '',
};

console.log('\n✅ Тест 1: Успішний запит');
app(reqSuccess, resSuccess);

// Запит без авторизації
const reqFail: AppRequest = {
    path: '/dashboard',
    headers: {},
};

const resFail: AppResponse = {
    status: 0,
    body: '',
};

console.log(`\nКод відповіді: ${resSuccess.status}`);
console.log(`Тіло відповіді: ${resSuccess.body}`);

console.log('-'.repeat(50));
console.log('\n❌ Тест 2: Запит без авторизації');
app(reqFail, resFail);

console.log(`\nКод відповіді: ${resFail.status}`);
console.log(`Тіло відповіді: ${resFail.body}`);
