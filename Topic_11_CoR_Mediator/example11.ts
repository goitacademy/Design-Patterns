interface Mediator {
    notify(sender: FormComponent): void;
}

interface FormComponent {
    setMediator(mediator: Mediator): void;
}

class InputField implements FormComponent {
    private value = '';
    private mediator: Mediator | null = null;
    private isPasswordVisible = false;

    setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }

    setValue(value: string): void {
        this.value = value;
        this.mediator?.notify(this);
    }

    getValue(): string {
        return this.value;
    }

    setPasswordVisible(visible: boolean): void {
        this.isPasswordVisible = visible;
        console.log(
            `Поле паролю: ${visible ? 'символи відображаються' : 'символи приховані'}`,
        );
    }
}

class ShowPasswordCheckbox implements FormComponent {
    private checked = false;
    private mediator: Mediator | null = null;

    setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }

    toggle(): void {
        this.checked = !this.checked;
        this.mediator?.notify(this);
    }

    isChecked(): boolean {
        return this.checked;
    }
}

class SubmitButton implements FormComponent {
    private enabled = false;
    private mediator: Mediator | null = null;

    setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }

    setEnabled(state: boolean): void {
        this.enabled = state;
        if (state) {
            console.log(
                'Кнопка активована: пароль відповідає вимогам (мінімум 6 символів)',
            );
        } else {
            console.log(
                'Кнопка деактивована: пароль закороткий (потрібно мінімум 6 символів)',
            );
        }
    }
}

class FormMediator implements Mediator {
    constructor(
        private input: InputField,
        private checkbox: ShowPasswordCheckbox,
        private button: SubmitButton,
    ) {}

    notify(sender: FormComponent): void {
        if (sender === this.input) {
            const value = this.input.getValue();
            const isValid = value.length >= 6;
            this.button.setEnabled(isValid);
        }

        if (sender === this.checkbox) {
            const isVisible = this.checkbox.isChecked();
            this.input.setPasswordVisible(isVisible);
        }
    }
}

// Тестування
const input = new InputField();
const checkbox = new ShowPasswordCheckbox();
const button = new SubmitButton();

const mediator = new FormMediator(input, checkbox, button);

input.setMediator(mediator);
checkbox.setMediator(mediator);
button.setMediator(mediator);

// Демонстрація роботи форми з паролем
// 1. Перевірка валідації довжини пароля
input.setValue('123'); // Спроба встановити закороткий пароль (3 символи)
input.setValue('123456'); // Встановлення валідного пароля (6 символів)

// 2. Перевірка функціоналу показу/приховування пароля
checkbox.toggle(); // Показуємо символи пароля (для перевірки правильності введення)
checkbox.toggle(); // Приховуємо символи пароля (для безпеки)
