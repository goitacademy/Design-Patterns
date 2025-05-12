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

    constructor(data: FinancialData) {
        this.data = data;
    }

    generate(): void {
        this.prepareData();
        this.renderHeader();
        this.renderBody();
        this.renderFooter();
        this.save();
    }

    protected prepareData(): void {
        console.log("[INFO] Підготовка фінансових даних за період " + this.data.period);
        this.calculateMetrics();
    }

    private calculateMetrics(): void {
        const profit = this.data.revenue - this.data.expenses;
        const profitMargin = (profit / this.data.revenue) * 100;
    }

    protected abstract renderHeader(): void;
    protected abstract renderBody(): void;
    protected abstract renderFooter(): void;
    protected abstract save(): void;
}

class MarkdownReportGenerator extends ReportGenerator {
    private content: string = "";

    constructor(data: FinancialData) {
        super(data);
    }

    protected renderHeader(): void {
        this.content = `# Фінансовий звіт за ${this.data.period}\n\n`;
        this.content += `## Загальні показники\n`;
        this.content += `* Дохід: ${this.data.revenue} грн\n`;
        this.content += `* Витрати: ${this.data.expenses} грн\n`;
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
    private content: string = "";

    constructor(data: FinancialData) {
        super(data);
    }

    protected renderHeader(): void {
        this.content = `<!DOCTYPE html>
<html>
<head>
    <title>Фінансовий звіт за ${this.data.period}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .positive { color: green; }
        .negative { color: red; }
        .summary { background: #f5f5f5; padding: 20px; }
    </style>
</head>
<body>
    <h1>Фінансовий звіт за ${this.data.period}</h1>
    <div class="summary">
        <h2>Загальні показники</h2>
        <p>Дохід: ${this.data.revenue} грн</p>
        <p>Витрати: ${this.data.expenses} грн</p>
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

// Тестування
console.log("=== Генерація Markdown звіту ===");
const markdownReport = new MarkdownReportGenerator(testData);
markdownReport.generate();

console.log("\n=== Генерація HTML звіту ===");
const htmlReport = new HtmlReportGenerator(testData);
htmlReport.generate();

