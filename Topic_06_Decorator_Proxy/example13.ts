interface ServiceInterface {
    operation(user: string): void;
}

class RealService implements ServiceInterface {
    operation(user: string): void {
        console.log(`Сервіс виконує реальну операцію для користувача ${user}.`);
    }
}

class ProxyService implements ServiceInterface {
    private realService: RealService;
    private allowedUsers = new Set(["admin", "manager"]);

    constructor(realService: RealService) {
        this.realService = realService;
    }

    private checkAccess(user: string): boolean {
        console.log(`Перевірка доступу для ${user}...`);
        if (!this.allowedUsers.has(user)) {
            console.log("⛔ Доступ заборонено!");
            return false;
        }
        return true;
    }

    operation(user: string): void {
        if (!this.checkAccess(user)) return;
        this.realService.operation(user);
    }
}

function clientCode(service: ServiceInterface, user: string): void {
    service.operation(user);
}

const realService = new RealService();
const proxy = new ProxyService(realService);

console.log("Клієнт працює безпосередньо з сервісом:");
clientCode(realService, "admin");

console.log("\nКлієнт працює через проксі:");
clientCode(proxy, "admin");
clientCode(proxy, "user");
clientCode(proxy, "manager");