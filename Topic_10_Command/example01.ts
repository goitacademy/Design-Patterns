// ⚠️ Цей код не скомпілюється/не запуститься у Node.js або TypeScript без DOM-оточення (наприклад, у терміналі),
// бо document.getElementById існує лише у браузері. Для запуску потрібен браузер або емуляція DOM (jsdom).
// Причина: document.getElementById("switch") поверне помилку ReferenceError у середовищі без window/document.

class Light {
  turnOn(): void {
    console.log("💡 Світло увімкнено");
  }
}

const light = new Light();
const button = document.getElementById("switch")!;
button.addEventListener("click", () => light.turnOn());

class TextEditor {
  applyBold(): void {
    console.log("🔠 Стиль: жирний");
  }
}

const editor = new TextEditor();
editor.applyBold(); // Виконання дії
