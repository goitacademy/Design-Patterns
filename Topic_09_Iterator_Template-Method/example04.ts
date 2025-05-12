class Range implements Iterable<number> {
    constructor(private from: number, private to: number) { }

    *[Symbol.iterator](): Generator<number> {
        for (let i = this.from; i <= this.to; i++) {
            yield i;
        }
    }
}

for (const n of new Range(3, 5)) {
    console.log(n);
}