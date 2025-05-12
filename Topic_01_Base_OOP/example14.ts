class Room {
    private number: number;
    private area: number;
    private type: string;

    constructor(number: number, area: number, type: string) {
        this.number = number;
        this.area = area;
        this.type = type;
        console.log(`Створено кімнату №${number}, тип: ${type}, площа: ${area} м²`);
    }

    public getInfo(): string {
        return `Кімната №${this.number}, тип: ${this.type}, площа: ${this.area} м²`;
    }
}

class House {
    private address: string;
    private totalArea: number;
    private rooms: Room[] = [];

    constructor(address: string, numberOfRooms: number) {
        this.address = address;
        this.totalArea = 0;

        // Створення кімнат всередині конструктора будинку (композиція)
        console.log(`Створення будинку за адресою: ${address}`);

        // Створюємо різні типи кімнат
        this.createRoom(20, "вітальня");
        this.createRoom(15, "спальня");

        for (let i = 0; i < numberOfRooms - 2; i++) {
            let type = "допоміжна";
            if (i === 0) type = "кухня";
            else if (i === 1) type = "ванна кімната";

            this.createRoom(10, type);
        }

        console.log(`Загальна площа будинку: ${this.totalArea} м²`);
    }

    private createRoom(area: number, type: string): void {
        const roomNumber = this.rooms.length + 1;
        const room = new Room(roomNumber, area, type);
        this.rooms.push(room);
        this.totalArea += area;
    }

    public getAddress(): string {
        return this.address;
    }

    public getRoomsCount(): number {
        return this.rooms.length;
    }

    public getTotalArea(): number {
        return this.totalArea;
    }

    public displayInfo(): void {
        console.log(`Будинок за адресою: ${this.address}`);
        console.log(`Кількість кімнат: ${this.rooms.length}`);
        console.log(`Загальна площа: ${this.totalArea} м²`);

        console.log("\nІнформація про кімнати:");
        this.rooms.forEach(room => {
            console.log(`- ${room.getInfo()}`);
        });
    }
}

// Використання
const house = new House("вул. Заміська, 15", 5);
house.displayInfo();

// Важливо: ми не маємо прямого доступу до кімнат поза контекстом будинку
// Кімнати створюються і управляються виключно всередині класу House
console.log(`\nБудинок має ${house.getRoomsCount()} кімнат і загальну площу ${house.getTotalArea()} м²`);