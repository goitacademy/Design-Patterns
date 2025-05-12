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
}

class Employee extends User {
    position: string;

    constructor(name: string, email: string, password: string, position: string) {
        super(name, email, password);
        this.position = position;
    }

    showInfo(): void {
        console.log(`Ім'я: ${this.name}`);    // public — доступ є
        console.log(`Email: ${this.email}`);  // protected — доступ є
        console.log(`Пароль: ${this.password}`); // private — доступу немає, помилка!
    }
}