interface View {
    update(): void;
}

class Model {
    private views: Set<View> = new Set();
    private userData: {
        name: string;
        email: string;
        avatar: string;
    } = {
        name: '',
        email: '',
        avatar: ''
    };

    public subscribe(view: View): void {
        this.views.add(view);
    }

    public unsubscribe(view: View): void {
        this.views.delete(view);
    }

    public setUserData(data: Partial<typeof this.userData>): void {
        this.userData = { ...this.userData, ...data };
        this.notify();
    }

    public getUserData(): typeof this.userData {
        return { ...this.userData };
    }

    private notify(): void {
        for (const view of this.views) {
            view.update();
        }
    }
}

class UserProfileView implements View {
    private template = `
        Профіль користувача:
        Аватар: {{avatar}}
        Ім'я: {{name}}
        Email: {{email}}
    `;

    constructor(private model: Model) {}

    update(): void {
        const data = this.model.getUserData();
        const output = this.template
            .replace('{{avatar}}', data.avatar)
            .replace('{{name}}', data.name)
            .replace('{{email}}', data.email);
        
        console.log(output);
    }
}

// Використання
const model = new Model();
const view = new UserProfileView(model);

model.subscribe(view);

// При зміні даних view автоматично оновиться
model.setUserData({
    name: 'Іван Петренко',
    email: 'ivan@example.com',
    avatar: '/images/avatar.jpg'
});
