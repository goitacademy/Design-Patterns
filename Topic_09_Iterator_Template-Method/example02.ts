interface Iterator<T> {
    next(): { value: T | null; done: boolean };
}

class ItemCollection<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    createIterator(): Iterator<T> {
        return new ArrayIterator<T>(this.items);
    }
}

class ArrayIterator<T> implements Iterator<T> {
    private index = 0;

    constructor(private collection: T[]) { }

    next(): { value: T | null; done: boolean } {
        if (this.index < this.collection.length) {
            return { value: this.collection[this.index++], done: false };
        }
        return { value: null, done: true };
    }
}

const collection = new ItemCollection<string>();
collection.add("🟡");
collection.add("🟠");
collection.add("🟣");


const iterator = collection.createIterator();
let result = iterator.next();

while (!result.done) {
    console.log("Елемент:", result.value);
    result = iterator.next();
}