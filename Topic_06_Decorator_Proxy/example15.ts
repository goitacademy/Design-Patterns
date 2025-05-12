interface ServiceInterface {
    operation(user: string): void;
}

class RealService implements ServiceInterface {
    operation(user: string): void {
        console.log(`Сервіс виконує реальну операцію для користувача ${user}.`);
    }
}

const realService = new RealService();

const allowedUsers = new Set(["admin", "manager"]);

const proxyRealService = new Proxy(realService, {
    get(target, prop, receiver) {
        if (prop === "operation") {
            return function (this: RealService, user: string) {
                console.log(`Перевірка доступу для ${user}...`);
                if (!allowedUsers.has(user)) {
                    console.log("⛔ Доступ заборонено!");
                    return;
                }
                return target.operation.call(this, user);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
}) as ServiceInterface;

function clientCode(service: ServiceInterface, user: string): void {
    service.operation(user);
}

console.log("Клієнт працює безпосередньо з сервісом:");
clientCode(realService, "admin");

console.log("\nКлієнт працює через проксі:");
clientCode(proxyRealService, "admin");
clientCode(proxyRealService, "user");
clientCode(proxyRealService, "manager");