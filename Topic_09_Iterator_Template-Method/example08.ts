interface FinancialData {
    revenue: number;
    expenses: number;
    period: string;
    transactions: Transaction[];
}

interface Transaction {
    date: string;
    amount: number;
    description: string;
}

abstract class ReportGenerator {
    protected data: FinancialData;
    protected profit: number = 0;
    protected profitMargin: number = 0;

    constructor(data: FinancialData) {
        this.data = data;
    }

    public generate(): void {
        console.log("[INFO] Початок генерації звіту...");

        // Hook перед підготовкою даних
        this.beforePrepareData();

        this.prepareData();

        // Hook після підготовки даних
        this.afterPrepareData();

        // Hook перед рендерингом
        if (this.shouldRenderReport()) {
            this.renderHeader();
            this.renderBody();
            this.renderFooter();

            // Hook перед збереженням
            if (this.shouldSaveReport()) {
                this.save();
            }
        }

        // Hook після всіх операцій
        this.afterReportGeneration();

        console.log("[INFO] Звіт згенеровано успішно");
    }

    // Hook-методи, які підкласи можуть перевизначати
    protected beforePrepareData(): void {
        // За замовчуванням нічого не робить
    }

    protected afterPrepareData(): void {
        // За замовчуванням нічого не робить
    }

    protected shouldRenderReport(): boolean {
        // За замовчуванням завжди рендеримо
        return true;
    }

    protected shouldSaveReport(): boolean {
        // За замовчуванням завжди зберігаємо
        return true;
    }

    protected afterReportGeneration(): void {
        // За замовчуванням нічого не робить
    }

    protected prepareData(): void {
        console.log("[INFO] Підготовка фінансових даних за період " + this.data.period);
        this.calculateMetrics();
    }

    private calculateMetrics(): void {
        this.profit = this.data.revenue - this.data.expenses;
        this.profitMargin = (this.profit / this.data.revenue) * 100;
    }

    protected abstract renderHeader(): void;
    protected abstract renderBody(): void;
    protected abstract renderFooter(): void;
    protected abstract save(): void;
}

class MarkdownReportGenerator extends ReportGenerator {
    private skipSave: boolean = false;
    private content: string = "";

    constructor(data: FinancialData) {
        super(data);
    }

    // Приклад використання hook-методу
    protected beforePrepareData(): void {
        console.log("[INFO] Підготовка до генерації Markdown...");
    }

    // Приклад умовного збереження
    protected shouldSaveReport(): boolean {
        return !this.skipSave;
    }

    // Можливість встановити пропуск збереження
    public setSkipSave(skip: boolean): void {
        this.skipSave = skip;
    }

    protected renderHeader(): void {
        this.content = `# Фінансовий звіт за ${this.data.period}\n\n`;
        this.content += `## Загальні показники\n`;
        this.content += `* Дохід: ${this.data.revenue} грн\n`;
        this.content += `* Витрати: ${this.data.expenses} грн\n`;
        this.content += `* Прибуток: ${this.profit} грн\n`;
        this.content += `* Маржа: ${this.profitMargin.toFixed(2)}%\n\n`;
    }

    protected renderBody(): void {
        this.content += `## Транзакції\n\n`;
        this.data.transactions.forEach(transaction => {
            const type = transaction.amount > 0 ? "+" : "-";
            this.content += `* ${transaction.date}: ${type}${Math.abs(transaction.amount)} грн - ${transaction.description}\n`;
        });
        this.content += "\n";
    }

    protected renderFooter(): void {
        const balance = this.data.transactions.reduce((sum, t) => sum + t.amount, 0);
        this.content += `## Підсумок\n`;
        this.content += `Баланс за період: ${balance} грн\n\n`;
        this.content += `---\n`;
        this.content += `Звіт згенеровано: ${new Date().toLocaleString()}\n`;
    }

    protected save(): void {
        const fileName = `report-${this.data.period}.md`;
        const fs = require('fs');
        fs.writeFileSync(fileName, this.content);
        console.log(`[INFO] Звіт збережено у файл: ${fileName}`);
    }
}

class HtmlReportGenerator extends ReportGenerator {
    private includeStyles: boolean = true;
    private content: string = "";

    constructor(data: FinancialData) {
        super(data);
    }

    // Приклад використання hook-методу для кастомізації стилів
    protected afterPrepareData(): void {
        if (!this.includeStyles) {
            console.log("[INFO] Генерація HTML без стилів...");
        }
    }

    protected renderHeader(): void {
        this.content = `<!DOCTYPE html>
<html>
<head>
    <title>Фінансовий звіт за ${this.data.period}</title>`;

        if (this.includeStyles) {
            this.content += `
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .positive { color: green; }
        .negative { color: red; }
        .summary { background: #f5f5f5; padding: 20px; }
    </style>`;
        }

        this.content += `
</head>
<body>
    <h1>Фінансовий звіт за ${this.data.period}</h1>
    <div class="summary">
        <h2>Загальні показники</h2>
        <p>Дохід: ${this.data.revenue} грн</p>
        <p>Витрати: ${this.data.expenses} грн</p>
        <p>Прибуток: ${this.profit} грн</p>
        <p>Маржа: ${this.profitMargin.toFixed(2)}%</p>
    </div>`;
    }

    protected renderBody(): void {
        this.content += `
    <h2>Транзакції</h2>
    <table border="1" cellpadding="10">
        <tr>
            <th>Дата</th>
            <th>Сума</th>
            <th>Опис</th>
        </tr>`;

        this.data.transactions.forEach(transaction => {
            const className = transaction.amount > 0 ? "positive" : "negative";
            this.content += `
        <tr>
            <td>${transaction.date}</td>
            <td class="${className}">${transaction.amount > 0 ? "+" : ""}${transaction.amount} грн</td>
            <td>${transaction.description}</td>
        </tr>`;
        });

        this.content += `
    </table>`;
    }

    protected renderFooter(): void {
        const balance = this.data.transactions.reduce((sum, t) => sum + t.amount, 0);
        this.content += `
    <div class="summary">
        <h2>Підсумок</h2>
        <p>Баланс за період: ${balance} грн</p>
        <hr>
        <small>Звіт згенеровано: ${new Date().toLocaleString()}</small>
    </div>
</body>
</html>`;
    }

    protected save(): void {
        const fileName = `report-${this.data.period}.html`;
        const fs = require('fs');
        fs.writeFileSync(fileName, this.content);
        console.log(`[INFO] Звіт збережено у файл: ${fileName}`);
    }

    // Метод для налаштування стилів
    public setIncludeStyles(include: boolean): void {
        this.includeStyles = include;
    }
}

// Тестові дані
const testData: FinancialData = {
    revenue: 150000,
    expenses: 85000,
    period: "2024-Q1",
    transactions: [
        { date: "2024-01-15", amount: 45000, description: "Продаж продукту А" },
        { date: "2024-02-01", amount: -30000, description: "Оплата оренди" },
        { date: "2024-02-15", amount: 65000, description: "Продаж продукту B" },
        { date: "2024-03-01", amount: -25000, description: "Зарплати" }
    ]
};

// Тестування з використанням hook-методів
console.log("=== Генерація Markdown звіту (зі збереженням) ===");
const markdownReport = new MarkdownReportGenerator(testData);
markdownReport.generate();

console.log("\n=== Генерація Markdown звіту (без збереження) ===");
const markdownReportNoSave = new MarkdownReportGenerator(testData);
markdownReportNoSave.setSkipSave(true);
markdownReportNoSave.generate();

console.log("\n=== Генерація HTML звіту (зі стилями) ===");
const htmlReport = new HtmlReportGenerator(testData);
htmlReport.generate();

console.log("\n=== Генерація HTML звіту (без стилів) ===");
const htmlReportNoStyles = new HtmlReportGenerator(testData);
htmlReportNoStyles.setIncludeStyles(false);
htmlReportNoStyles.generate(); 