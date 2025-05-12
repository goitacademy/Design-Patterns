class Circle {
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

class Rectangle {
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

class GraphicGroup {
    private x: number = 0;
    private y: number = 0;
    circles: Circle[] = [];
    rectangles: Rectangle[] = [];
    groups: GraphicGroup[] = [];

    draw(): void {
        console.log(`Малюємо групу на позиції (${this.x}, ${this.y})`);
        for (const circle of this.circles) {
            circle.draw();
        }
        for (const rectangle of this.rectangles) {
            rectangle.draw();
        }
        for (const group of this.groups) {
            group.draw();
        }
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    getChildren(): (Circle | Rectangle | GraphicGroup)[] {
        return [...this.circles, ...this.rectangles, ...this.groups];
    }
}

type GraphicalObject = Circle | Rectangle | GraphicGroup;

function moveObject(object: GraphicalObject, newX: number, newY: number): void {
    if (object instanceof Circle || object instanceof Rectangle) {
        // Логіка переміщення простого примітиву
        object.setPosition(newX, newY);
    } else if (object instanceof GraphicGroup) {
        // Логіка переміщення групи примітивів
        object.setPosition(newX, newY);
        for (const child of object.getChildren()) {
            moveObject(child, newX, newY); // Рекурсивний виклик для кожного елемента групи
        }
    }
}