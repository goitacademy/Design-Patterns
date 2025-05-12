const exportableFields = new WeakMap<object, string[]>();

function Exportable<This extends object, Value>(
    target: undefined,
    context: ClassFieldDecoratorContext<This, Value>
): void {
    const name = String(context.name);

    context.addInitializer(function (this: This) {
        const fields = exportableFields.get(this) ?? [];
        exportableFields.set(this, [...fields, name]);
    });
}

class User {
    @Exportable
    name = "Іван";

    @Exportable
    email = "ivan@example.com";

    password = "secret";
}

const u = new User();
console.log(exportableFields.get(u)); 
