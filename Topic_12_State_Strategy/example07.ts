type User = {
  name: string;
  age: number;
  registeredAt: Date;
};

function sortUsers(users: User[], criterion: string): User[] {
  if (criterion === "name") {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criterion === "age") {
    return users.sort((a, b) => a.age - b.age);
  } else if (criterion === "date") {
    return users.sort(
      (a, b) => a.registeredAt.getTime() - b.registeredAt.getTime()
    );
  } else {
    throw new Error("Невідомий критерій сортування");
  }
}

const users: User[] = [
  { name: "Оксана", age: 29, registeredAt: new Date("2023-09-01") },
  { name: "Андрій", age: 22, registeredAt: new Date("2024-01-15") },
  { name: "Ігор", age: 35, registeredAt: new Date("2022-11-20") },
];

console.log(sortUsers(users, "name"));
console.log(sortUsers(users, "age"));
