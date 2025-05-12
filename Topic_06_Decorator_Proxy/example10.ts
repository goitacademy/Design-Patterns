// УВАГА! Декоратори параметрів (parameter decorators) не підтримуються у сучасному TypeScript (5.x+) і цей код не скомпілюється.
// Це лише демонстраційний приклад синтаксису старого стандарту декораторів.
// Якщо спробуєте скомпілювати — отримаєте помилку "Decorators are not valid here".

import "reflect-metadata";

const PARAM_METADATA_KEY = Symbol("log_params");

function LogParam(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
): void {
  const existingParams: number[] =
    Reflect.getOwnMetadata(PARAM_METADATA_KEY, target, propertyKey) ?? [];
  Reflect.defineMetadata(
    PARAM_METADATA_KEY,
    [...existingParams, parameterIndex],
    target,
    propertyKey
  );
}

class ExampleService {
  test(@LogParam userId: string, @LogParam role: string): void {
    const indices =
      Reflect.getOwnMetadata(PARAM_METADATA_KEY, this, "test") ?? [];
    for (const i of indices) {
      console.log(`📌 Параметр #${i}:`, arguments[i]);
    }
  }
}

const svc = new ExampleService();
svc.test("abc123", "admin");
