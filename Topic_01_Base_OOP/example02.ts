class Book {
    title: string;
    author: string;
    year: number;
    pages: number;
    isBorrowed: boolean;

    constructor(title: string, author: string, year: number, pages: number) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Книгу "${this.title}" було успішно позичено.`);
        } else {
            console.log(`Книга "${this.title}" вже позичена.`);
        }
    }

    returnBook(): void {
        if (this.isBorrowed) {
            this.isBorrowed = false;
            console.log(`Книгу "${this.title}" повернуто до бібліотеки.`);
        } else {
            console.log(`Книга "${this.title}" і так знаходиться у бібліотеці.`);
        }
    }
}

// Створюємо екземпляри класу Book
const book1 = new Book("Кобзар", "Тарас Шевченко", 1840, 256);
const book2 = new Book("Гаррі Поттер", "Джоан Роулінг", 1997, 320);

book1.borrow();  // Книгу "Кобзар" було успішно позичено.
book1.borrow();  // Книга вже позичена.
book1.returnBook();  // Книга повертається до бібліотеки.
