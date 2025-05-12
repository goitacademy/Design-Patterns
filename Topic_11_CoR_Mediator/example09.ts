class User {
    constructor(private name: string) {}

    sendMessage(message: string, recipient: User): void {
        console.log(
            `${this.name} надсилає повідомлення ${recipient.getName()}: ${message}`,
        );
        recipient.receiveMessage(message, this);
    }

    receiveMessage(message: string, sender: User): void {
        console.log(
            `${this.name} отримує повідомлення від ${sender.getName()}: ${message}`,
        );
    }

    getName(): string {
        return this.name;
    }
}

// Використання
const user1 = new User('Аліса');
const user2 = new User('Боб');
const user3 = new User('Карл');

user1.sendMessage('Привіт, як справи?', user2);
user2.sendMessage('Все добре, дякую!', user1);
user1.sendMessage('Привіт, Карле!', user3);
