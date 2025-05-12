class Person {
    constructor(
        public name: string,
        public address: PersonAddress,
    ) { }

    getAddress(): string {
        return this.address.format();
    }
}

class PersonAddress {
    constructor(
        public street: string,
        public city: string,
        public zip: string,
    ) { }

    format(): string {
        return `${this.zip}, ${this.city}, ${this.street}`;
    }
}

// Використання класів:
const person = new Person('Alexander', new PersonAddress('Khreshchatyk', 'Kyiv', '01001'));

console.log(person.getAddress());  