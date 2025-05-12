class Node<T> {
    constructor(
        public value: T,
        public next: Node<T> | null = null,
        public prev: Node<T> | null = null
    ) { }
}

class LinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;

    append(value: T): void {
        const node = new Node(value);
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
    }

    getHead(): Node<T> | null {
        return this.head;
    }
}

function printList<T>(list: LinkedList<T>): void {
    let current = list.getHead();
    while (current) {
        console.log(current.value);
        current = current.next;
    }
}

const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
printList(list);