const person = { name: "Марія", age: 28 };

const proxyPerson = new Proxy(person, {
    get(target, prop) {
        console.log(`Зчитування поля ${String(prop)}`);
        return target[prop as keyof typeof target];
    }
});

console.log(proxyPerson.name);

const secureData = {
    secret: "Захований рядок",
    public: "Публічна інформація"
};

const proxySecureData = new Proxy(secureData, {
    get(target, prop) {
        if (prop === "secret") {
            throw new Error("⛔️ Доступ до секретної інформації заборонено");
        }
        return target[prop as keyof typeof target];
    }
});

console.log(proxySecureData.public);
console.log(proxySecureData.secret); 