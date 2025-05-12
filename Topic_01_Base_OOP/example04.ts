class User {
    public name: string;
    protected email: string;
    private password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public greet(): void {
        console.log(`Вітаємо, ${this.name}!`);
    }

    public setPassword(newPassword: string): void {
        if (newPassword.length >= 8) {
            this.password = newPassword;
        } else {
            console.log("Пароль повинен містити щонайменше 8 символів.");
        }
    }

    public checkPassword(passwordToCheck: string): boolean {
        return this.password === passwordToCheck;
    }
}

class Employee extends User {
    position: string;

    constructor(name: string, email: string, password: string, position: string) {
        super(name, email, password);
        this.position = position;
    }

    showInfo(): void {
        console.log(`Ім'я: ${this.name}`);
        console.log(`Email: ${this.email}`);
        if (this.checkPassword('secure123')) {
            console.log("Пароль введено правильно.");
        } else {
            console.log("Пароль неправильний.");
        }
    }
}

const employee = new Employee("Олена", "olena@example.com", "secure123", "менеджер");
employee.showInfo();