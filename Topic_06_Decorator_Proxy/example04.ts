const registry: string[] = [];

function Register(name: string) {
  return function <T extends { new (...args: any[]): {} }>(target: T): void {
    registry.push(name);
  };
}

@Register("UserModel")
class User {}

@Register("ArticleModel")
class Article {}

console.log(registry);
