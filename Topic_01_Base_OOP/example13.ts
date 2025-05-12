class Book {
    private isbn: string;
    private title: string;
    private author: string;
    private yearPublished: number;

    constructor(isbn: string, title: string, author: string, yearPublished: number) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.yearPublished = yearPublished;
    }

    public getIsbn(): string {
        return this.isbn;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getYearPublished(): number {
        return this.yearPublished;
    }

    public displayInfo(): void {
        console.log(`${this.title} (${this.yearPublished}) автора ${this.author}, ISBN: ${this.isbn}`);
    }
}

class Library {
    private name: string;
    private address: string;
    private books: Map<string, Book> = new Map(); // Книги, індексовані за ISBN

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }

    public addBook(book: Book): void {
        this.books.set(book.getIsbn(), book);
        console.log(`Книга '${book.getTitle()}' додана до бібліотеки ${this.name}`);
    }

    public removeBook(isbn: string): Book | undefined {
        const book = this.books.get(isbn);
        if (book) {
            this.books.delete(isbn);
            console.log(`Книга '${book.getTitle()}' видалена з бібліотеки ${this.name}`);
            return book;
        }
        console.log(`Книга з ISBN ${isbn} не знайдена в бібліотеці`);
        return undefined;
    }

    public findBookByIsbn(isbn: string): Book | undefined {
        return this.books.get(isbn);
    }

    public displayCatalog(): void {
        console.log(`\nКаталог бібліотеки "${this.name}" (${this.address}):`);
        if (this.books.size === 0) {
            console.log("Каталог порожній");
            return;
        }
        let i = 1;
        this.books.forEach(book => {
            console.log(`${i++}. ${book.getTitle()} (${book.getYearPublished()}) - ${book.getAuthor()}`);
        });
    }
}

// Створення книг (можуть існувати незалежно від бібліотеки)
const book1 = new Book("978-0132350884", "Clean Code", "Robert C. Martin", 2008);
const book2 = new Book("978-0201633610", "Design Patterns", "Erich Gamma et al.", 1994);
const book3 = new Book("978-0134757599", "Refactoring", "Martin Fowler", 2018);

// Створення бібліотеки
const cityLibrary = new Library("Міська бібліотека", "вул. Центральна, 1");

// Додавання книг до бібліотеки (агрегація)
cityLibrary.addBook(book1);
cityLibrary.addBook(book2);
cityLibrary.addBook(book3);

// Виведення каталогу бібліотеки
cityLibrary.displayCatalog();

// Видалення книги з бібліотеки
const removedBook = cityLibrary.removeBook("978-0201633610");

// Оновлений каталог
cityLibrary.displayCatalog();

// Демонстрація того, що книга продовжує існувати після видалення з бібліотеки
console.log("\nКнига існує окремо від бібліотеки:");
if (removedBook) {
    removedBook.displayInfo();
}