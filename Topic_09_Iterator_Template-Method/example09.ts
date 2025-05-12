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

        this.prepareData();

        // Hook перед рендерингом
        this.beforeRender();

        this.renderHeader();
        this.renderBody();
        this.renderFooter();

        // Hook після рендерингу
        this.afterRender();

        this.save();
        console.log("[INFO] Звіт згенеровано успішно");
    }

    // Hook-методи, які підкласи можуть перевизначати
    protected beforeRender(): void {
        // За замовчуванням нічого не робить
    }

    protected afterRender(): void {
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
    private content: string = "";
    private draft: boolean = false;
    private needsApproval: boolean = false;

    constructor(data: FinancialData) {
        super(data);
    }

    // Hook перед рендерингом - додає статус документа
    protected beforeRender(): void {
        if (this.draft) {
            console.log("[INFO] Додавання позначки чернетки...");
            this.content = "> **ЧЕРНЕТКА** - не для поширення\n\n";
        }
    }

    // Hook після рендерингу - додає інформацію про необхідність затвердження
    protected afterRender(): void {
        if (this.needsApproval) {
            console.log("[INFO] Додавання інформації про необхідність затвердження...");
            this.content += "\n\n---\n";
            this.content += "**Статус:** Потребує затвердження\n";
            this.content += "- [ ] Перевірено бухгалтером\n";
            this.content += "- [ ] Затверджено керівником\n";
        }
    }

    public setDraft(isDraft: boolean): void {
        this.draft = isDraft;
    }

    public setNeedsApproval(needsApproval: boolean): void {
        this.needsApproval = needsApproval;
    }

    protected renderHeader(): void {
        this.content += `# Фінансовий звіт за ${this.data.period}\n\n`;
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
        const prefix = this.draft ? "draft-" : "";
        const fileName = `${prefix}report-${this.data.period}.md`;
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

// Тестування з використанням hook-методів
console.log("=== Генерація звичайного звіту ===");
const simpleReport = new MarkdownReportGenerator(testData);
simpleReport.generate();

console.log("\n=== Генерація чернетки звіту, що потребує затвердження ===");
const draftReport = new MarkdownReportGenerator(testData);
draftReport.setDraft(true);
draftReport.setNeedsApproval(true);
draftReport.generate();
