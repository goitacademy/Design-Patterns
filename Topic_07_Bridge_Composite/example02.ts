interface Graphic {
    draw(): void;
    setPosition(x: number, y: number): void;
}

class Circle implements Graphic {
    private x: number = 0;
    private y: number = 0;

    draw(): void {
        console.log(`Малюємо коло на позиції (${this.x}, ${this.y})`);
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

class Rectangle implements Graphic {
    private x: number = 0;
    private y: number = 0;

    draw(): void {
        console.log(`Малюємо прямокутник на позиції (${this.x}, ${this.y})`);
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}

class GraphicGroup implements Graphic {
    private children: Graphic[] = [];
    private x: number = 0;
    private y: number = 0;
  
    draw(): void {
        console.log(`Малюємо групу на позиції (${this.x}, ${this.y})`);
        for (const graphic of this.children) {
            graphic.draw();
        }
    }
  
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
        for (const child of this.children) {
            child.setPosition(x, y);
        }
    }
  
    add(graphic: Graphic): void {
        this.children.push(graphic);
    }
  
    remove(graphic: Graphic): void {
        const index = this.children.indexOf(graphic);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
  
    getChild(index: number): Graphic | null {
        return this.children[index] || null;
    }
}

function clientCode(graphic: Graphic): void {
    graphic.draw();
}
  
const circle1 = new Circle();
const circle2 = new Circle();
const rectangle = new Rectangle();
  
const group1 = new GraphicGroup();
group1.add(circle1);
group1.add(rectangle);
  
const group2 = new GraphicGroup();
group2.add(circle2);
group2.add(group1);
  
// Тестуємо різні позиції
console.log('Початкові позиції:');
clientCode(group2);

console.log('\nПереміщуємо всі об\'єкти в (10, 20):');
group2.setPosition(10, 20);
clientCode(group2);

console.log('\nПереміщуємо тільки перше коло в (30, 40):');
circle1.setPosition(30, 40);
clientCode(group2);