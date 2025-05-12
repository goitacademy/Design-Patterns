// function handleRequest(request: Request): void {
//     // Перевірка автентифікації
//     if (!request.hasAuthToken()) {
//         console.log("Відмовлено: відсутній токен автентифікації");
//         return;
//     }

//     // Перевірка прав доступу
//     if (!hasPermission(request.getUserId(), request.getResource())) {
//         console.log("Відмовлено: недостатньо прав");
//         return;
//     }

//     // Перевірка обмеження запитів
//     if (isRateLimited(request.getUserId())) {
//         console.log("Відмовлено: перевищено ліміт запитів");
//         return;
//     }

//     // Якщо всі перевірки пройдено
//     processRequest(request);
// }

// type ComplaintType = 'technical' | 'payment' | 'general';

// function handleComplaint(type: ComplaintType, message: string): void {
//     if (type === 'technical') {
//         console.log(`Технічна підтримка обробляє скаргу: ${message}`);
//     } else if (type === 'payment') {
//         console.log(`Фінансовий відділ обробляє скаргу: ${message}`);
//     } else if (type === 'general') {
//         console.log(`Адміністрація обробляє скаргу: ${message}`);
//     } else {
//         console.log(`Невідомий тип скарги: ${message}`);
//     }
// }

// handleComplaint('technical', 'Проблема з доступом до акаунта');
// handleComplaint('payment', 'Проблема з оплатою підписки');
// handleComplaint('general', 'Загальне питання про сервіс');