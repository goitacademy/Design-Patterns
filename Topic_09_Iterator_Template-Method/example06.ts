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

class ReportGenerator {
    protected data: FinancialData;

    constructor() {
        this.data = {
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

    protected renderHeader(): void {
        console.log("\n=== Фінансовий звіт за " + this.data.period + " ===");
        console.log(`Загальний дохід: ${this.data.revenue} грн`);
        console.log(`Загальні витрати: ${this.data.expenses} грн`);
    }

    protected renderBody(): void {
        console.log("\nДеталі транзакцій:");
        this.data.transactions.forEach(transaction => {
            const type = transaction.amount > 0 ? "📈" : "📉";
            console.log(`${type} ${transaction.date}: ${transaction.description} - ${Math.abs(transaction.amount)} грн`);
        });
    }

    protected renderFooter(): void {
        const balance = this.data.transactions.reduce((sum, t) => sum + t.amount, 0);
        console.log("\nПідсумок");
        console.log(`Баланс за період: ${balance} грн`);
        console.log("Звіт згенеровано: " + new Date().toLocaleString());
        console.log("\n==============================");
    }

    protected save(): void {
        console.log("\n[INFO] Звіт успішно збережено в системі");
    }
}

const report = new ReportGenerator();
report.generate();

