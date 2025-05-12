function LogAccess<This, Value>(
  originalGetter: (this: This) => Value,
  context: ClassGetterDecoratorContext<This, Value>
): (this: This) => Value {
  const property = String(context.name);
  return function (this: This): Value {
    console.log(`📥 Читання властивості ${property}`);
    return originalGetter.call(this);
  };
}

class Config {
  private _version = "1.2.3";

  @LogAccess
  get version(): string {
    return this._version;
  }
}

const cfg = new Config();
console.log(cfg.version); // Читання властивості version 1.2.3

function ValidateNonEmpty<This>(
  originalSetter: (this: This, value: string) => void,
  context: ClassSetterDecoratorContext<This, string>
): (this: This, value: string) => void {
  const prop = String(context.name);
  return function (this: This, value: string): void {
    if (!value.trim()) {
      throw new Error(`❌ Значення для ${prop} не може бути порожнім`);
    }
    originalSetter.call(this, value);
  };
}

class User {
  private _name = "";

  @ValidateNonEmpty
  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }
}

const u = new User();
console.log(u);
// @ts-ignore
u.name = "  ";
