class InputField {
    value = '';
    onChange: (() => void) | null = null;

    setValue(v: string) {
        this.value = v;
        this.onChange?.();
    }
}

class LoginButton {
    disabled = true;

    setDisabled(state: boolean) {
        this.disabled = state;
        console.log(`Кнопка входу: ${this.disabled ? 'вимкнена' : 'активна'}`);
    }
}

const input = new InputField();
const button = new LoginButton();

input.onChange = () => {
    const isEmpty = input.value.trim() === '';
    button.setDisabled(isEmpty);
};

class ErrorLabel {
    show(text: string) {
        console.log(`Помилка: ${text}`);
    }

    hide() {
        console.log('Помилка прихована');
    }
}

const error = new ErrorLabel();

input.onChange = () => {
    const isEmpty = input.value.trim() === '';
    button.setDisabled(isEmpty);

    if (isEmpty) {
        error.show('Поле не може бути порожнім');
    } else {
        error.hide();
    }
};
