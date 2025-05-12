// Функція для обробки DOM-дерева
function processDOM(element: HTMLElement, callback: (element: HTMLElement) => void): void {
    // Обробляємо поточний елемент
    callback(element);

    // Рекурсивно обробляємо дочірні елементи
    const children = Array.from(element.children) as HTMLElement[];
    for (const child of children) {
        processDOM(child, callback);
    }
}

// Функція, яка виконується після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    // Приклад 1: знайти всі посилання у документі
    const links: HTMLAnchorElement[] = [];

    processDOM(document.body, (element) => {
        if (element.tagName === 'A') {
            links.push(element as HTMLAnchorElement);
        }
    });

    console.log(`Знайдено ${links.length} посилань на сторінці`);

    // Приклад 2: підрахувати кількість елементів кожного типу
    const elementCounts: { [key: string]: number } = {};

    processDOM(document.body, (element) => {
        const tagName = element.tagName;
        elementCounts[tagName] = (elementCounts[tagName] || 0) + 1;
    });

    console.log('Кількість елементів за типами:', elementCounts);

    // Приклад 3: додати клас до всіх елементів
    processDOM(document.body, (element) => {
        element.classList.add('processed');
    });
});