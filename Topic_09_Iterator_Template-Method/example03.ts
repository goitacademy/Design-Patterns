class Range implements Iterable<number> {
    constructor(private from: number, private to: number) { }

    [Symbol.iterator](): Iterator<number> {
        let current = this.from;
        const end = this.to;

        return {
            next(): IteratorResult<number> {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}

for (const n of new Range(1, 3)) {
    console.log(n);
}