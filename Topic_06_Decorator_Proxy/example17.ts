enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

class AdminPanelImpl {
    private users: IUser[] = [
        { id: '1', name: 'John', email: 'john@example.com', role: UserRole.USER },
        { id: '2', name: 'Jane', email: 'jane@example.com', role: UserRole.USER }
    ];

    getUser(userId: string): IUser | undefined {
        return this.users.find(user => user.id === userId);
    }

    deleteUser(userId: string): void {
        const index = this.users.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new Error(`Користувач ${userId} не знайдений`);
        }
        const user = this.users[index];
        this.users.splice(index, 1);
        console.log(`Користувач ${userId} (${user.email}) видалений`);
    }

    updateUser(userId: string, data: Partial<IUser>): void {
        const user = this.users.find(user => user.id === userId);
        if (!user) {
            throw new Error(`Користувач ${userId} не знайдений`);
        }
        Object.assign(user, data);
        console.log(`Дані користувача ${userId} оновлені:`, data);
    }

    listUsers(): void {
        console.log('Список користувачів:');
        this.users.forEach(user => {
            console.log(`- ${user.id}: ${user.name} (${user.email})`);
        });
    }
}

interface IAdminApi {
    getUser(userId: string): IUser | undefined;
    deleteUser(userId: string): void;
    updateUser(userId: string, data: Partial<IUser>): void;
    listUsers(): void;
}

function createProtectedAdminPanel(userRole: UserRole): IAdminApi {
    const target = new AdminPanelImpl();
    const adminMethods = ['deleteUser', 'updateUser'];

    return new Proxy<IAdminApi>(target, {
        get(obj: IAdminApi, prop: string | symbol): unknown {
            const methodName = prop.toString();

            if (adminMethods.includes(methodName) && userRole !== UserRole.ADMIN) {
                throw new Error(`⛔️ Доступ заборонено до методу ${methodName}`);
            }

            const method = obj[prop as keyof IAdminApi];
            if (typeof method === 'function') {
                return function (this: unknown, ...args: unknown[]): unknown {
                    console.log(`Виклик ${methodName} користувачем з роллю ${userRole}`);
                    return (method as Function).apply(obj, args);
                };
            }
            return method;
        }
    });
}

// Тестування різних ролей
console.log('=== Адміністратор ===');
const adminPanel = createProtectedAdminPanel(UserRole.ADMIN);
adminPanel.listUsers();
adminPanel.deleteUser('1');

console.log('\n=== Звичайний користувач ===');
const userPanel = createProtectedAdminPanel(UserRole.USER);
userPanel.listUsers(); // може дивитись список
try {
    userPanel.deleteUser('2'); // не може видаляти
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log('Помилка:', e.message);
    }
}
