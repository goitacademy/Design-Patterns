class Person {
    constructor(
        public name: string,
        public street: string,
        public city: string,
        public zip: string,
    ) { }

    getAddress(): string {
        return `${this.zip}, ${this.city}, ${this.street}`;
    }
}

const person = new Person('Alexander', 'Khreshchatyk', 'Kyiv', '01001');

console.log(person.getAddress());  