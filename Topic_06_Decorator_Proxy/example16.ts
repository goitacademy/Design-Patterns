import { readFileSync } from 'fs';

class RealJsonDocument {
    private content: any;

    constructor(private path: string) {
        console.log(`Завантаження файлу: ${path}`);
        const raw = readFileSync(path, 'utf-8');
        this.content = JSON.parse(raw);
    }

    print(): void {
        const keys = Object.keys(this.content).slice(0, 3);
        for (const k of keys) {
            console.log(`${k}:`, this.content[k]);
        }
    }
}

type JsonApi = {
    print(): void;
};

function createLazyJson(path: string): JsonApi {
    let realDoc: RealJsonDocument | null = null;

    return new Proxy({} as JsonApi, {
        get(_, prop) {
            if (!realDoc) {
                realDoc = new RealJsonDocument(path);
            }
            const method = realDoc[prop as keyof RealJsonDocument];
            if (typeof method === "function") {
                return method.bind(realDoc);
            }
            return method;
        }
    });
}

const jsonDocument = createLazyJson("package-lock.json");
console.log("Об'єкт створено");

jsonDocument.print();


// const test = new RealJsonDocument("package-lock.json")
// console.log("🔸 Об'єкт створено");