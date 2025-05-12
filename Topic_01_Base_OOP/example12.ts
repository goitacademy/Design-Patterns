class Faculty {
    private id: number;
    private name: string;
    private departments: string[];

    constructor(id: number, name: string, departments: string[]) {
        this.id = id;
        this.name = name;
        this.departments = departments;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDepartments(): string[] {
        return this.departments;
    }

    public displayInfo(): void {
        console.log(`Факультет: ${this.name}`);
        console.log(`Кафедри: ${this.departments.join(', ')}`);
    }
}

class University {
    private name: string;
    private location: string;
    private faculties: Faculty[] = [];

    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
    }

    public addFaculty(faculty: Faculty): void {
        this.faculties.push(faculty);
    }

    public removeFaculty(facultyId: number): void {
        this.faculties = this.faculties.filter(faculty => faculty.getId() !== facultyId);
    }

    public getFaculties(): Faculty[] {
        return this.faculties;
    }

    public displayInfo(): void {
        console.log(`Університет: ${this.name}`);
        console.log(`Розташування: ${this.location}`);
        console.log(`Кількість факультетів: ${this.faculties.length}`);

        console.log("\nСписок факультетів:");
        this.faculties.forEach((faculty, index) => {
            console.log(`\n${index + 1}. ${faculty.getName()}`);
            console.log(`   Кафедри: ${faculty.getDepartments().join(', ')}`);
        });
    }
}

// Створення факультетів (можуть існувати незалежно від університету)
const engineeringFaculty = new Faculty(1, "Інженерний факультет", ["Механіка", "Електроніка", "Автоматизація"]);
const economicsFaculty = new Faculty(2, "Економічний факультет", ["Фінанси", "Маркетинг", "Менеджмент"]);
const computerScienceFaculty = new Faculty(3, "Факультет комп'ютерних наук", ["Програмування", "Бази даних", "Кібербезпека"]);

// Створення університету
const nationalUniversity = new University("Національний університет", "Київ");

// Додавання факультетів до університету (агрегація)
nationalUniversity.addFaculty(engineeringFaculty);
nationalUniversity.addFaculty(economicsFaculty);
nationalUniversity.addFaculty(computerScienceFaculty);

// Виведення інформації про університет та його факультети
nationalUniversity.displayInfo();

// Демонстрація видалення факультету з університету
nationalUniversity.removeFaculty(2); // Видаляємо економічний факультет
console.log("\nПісля видалення економічного факультету:");
nationalUniversity.displayInfo();

// Демонстрація того, що факультет продовжує існувати після видалення з університету
console.log("\nЕкономічний факультет існує окремо від університету:");
economicsFaculty.displayInfo();