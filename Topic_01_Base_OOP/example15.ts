class MenuItem {
    private id: number;
    private label: string;
    private action: () => void;

    constructor(id: number, label: string, action: () => void) {
        this.id = id;
        this.label = label;
        this.action = action;
    }

    public execute(): void {
        console.log(`Виконання дії меню: ${this.label}`);
        this.action();
    }

    public getLabel(): string {
        return this.label;
    }
}

class Menu {
    private title: string;
    private items: MenuItem[] = [];

    constructor(title: string) {
        this.title = title;
    }

    public addItem(label: string, action: () => void): void {
        const id = this.items.length + 1;
        const menuItem = new MenuItem(id, label, action);
        this.items.push(menuItem);
    }

    public displayMenu(): void {
        console.log(`Меню "${this.title}":`);
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.getLabel()}`);
        });
    }

    public executeItem(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items[index].execute();
        } else {
            console.log("Невірний індекс пункту меню");
        }
    }
}

class Application {
    private name: string;
    private version: string;
    private mainMenu: Menu;
    private fileMenu: Menu;
    private editMenu: Menu;
    private isRunning: boolean = false;

    constructor(name: string, version: string) {
        this.name = name;
        this.version = version;
        console.log(`Ініціалізація додатку ${name} v${version}`);

        // Створення вкладених компонентів за допомогою композиції
        this.mainMenu = new Menu("Головне меню");
        this.fileMenu = new Menu("Файл");
        this.editMenu = new Menu("Редагування");

        // Налаштування меню "Файл"
        this.fileMenu.addItem("Відкрити", () => console.log("Відкриття файлу..."));
        this.fileMenu.addItem("Зберегти", () => console.log("Збереження файлу..."));
        this.fileMenu.addItem("Вихід", () => this.exit());

        // Налаштування меню "Редагування"
        this.editMenu.addItem("Вирізати", () => console.log("Вирізання вибраного..."));
        this.editMenu.addItem("Копіювати", () => console.log("Копіювання вибраного..."));
        this.editMenu.addItem("Вставити", () => console.log("Вставка з буфера..."));

        // Налаштування головного меню
        this.mainMenu.addItem("Відкрити меню Файл", () => this.openFileMenu());
        this.mainMenu.addItem("Відкрити меню Редагування", () => this.openEditMenu());
        this.mainMenu.addItem("Довідка", () => console.log("Відображення довідки..."));
        this.mainMenu.addItem("Вихід", () => this.exit());
    }

    public start(): void {
        this.isRunning = true;
        console.log(`Запуск додатку ${this.name} v${this.version}`);
        this.showMainMenu();
    }

    public exit(): void {
        this.isRunning = false;
        console.log(`Завершення роботи додатку ${this.name}`);
    }

    private showMainMenu(): void {
        console.log("\n===================");
        this.mainMenu.displayMenu();
    }

    private openFileMenu(): void {
        console.log("\n===================");
        this.fileMenu.displayMenu();
    }

    private openEditMenu(): void {
        console.log("\n===================");
        this.editMenu.displayMenu();
    }

    public executeMainMenuItem(index: number): void {
        this.mainMenu.executeItem(index);
    }

    public executeFileMenuItem(index: number): void {
        this.fileMenu.executeItem(index);
    }

    public executeEditMenuItem(index: number): void {
        this.editMenu.executeItem(index);
    }

    public isApplicationRunning(): boolean {
        return this.isRunning;
    }
}

// Використання
const app = new Application("Текстовий редактор", "1.0");
app.start();

console.log("\nВиконання команд головного меню:");
app.executeMainMenuItem(0); // Відкрити меню Файл

console.log("\nВиконання команд меню Файл:");
app.executeFileMenuItem(0); // Відкрити файл

console.log("\nПовернення до головного меню і відкриття меню Редагування:");
app.executeMainMenuItem(1); // Відкрити меню Редагування

console.log("\nВиконання команд меню Редагування:");
app.executeEditMenuItem(1); // Копіювати

console.log("\nЗавершення роботи програми:");
app.executeMainMenuItem(3); // Вихід

console.log(`\nСтан додатку: ${app.isApplicationRunning() ? "працює" : "зупинений"}`);