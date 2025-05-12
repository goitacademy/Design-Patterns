class UserProfile {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone?: string,
    public city?: string,
    public birthday?: Date,
    public isPrivate?: boolean,
    public subscribed?: boolean
  ) { }
}

class UserProfileBuilder {
  private firstName: string;
  private lastName: string;
  private email: string;
  private phone?: string;
  private city?: string;
  private birthday?: Date;
  private isPrivate: boolean = false;
  private subscribed: boolean = true;

  setFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setPhone(phone: string | undefined): this {
    this.phone = phone;
    return this;
  }

  setCity(city: string | undefined): this {
    this.city = city;
    return this;
  }

  setBirthday(birthday: Date | undefined): this {
    this.birthday = birthday;
    return this;
  }

  setIsPrivate(isPrivate: boolean): this {
    this.isPrivate = isPrivate;
    return this;
  }

  setSubscribed(subscribed: boolean): this {
    this.subscribed = subscribed;
    return this;
  }

  build(): UserProfile {
    return new UserProfile(
      this.firstName,
      this.lastName,
      this.email,
      this.phone,
      this.city,
      this.birthday,
      this.isPrivate,
      this.subscribed
    );
  }
}

class UserProfileDirector {
  constructor(private builder: UserProfileBuilder) { }

  // Стандартний профіль користувача
  buildBasicProfile(firstName: string, lastName: string, email: string): UserProfile {
    return this.builder
      .setFirstName(firstName)
      .setLastName(lastName)
      .setEmail(email)
      .build();
  }

  // Повний профіль користувача з налаштуваннями приватності
  buildFullPrivateProfile(data: {
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    city?: string,
    birthday?: Date
  }): UserProfile {
    return this.builder
      .setFirstName(data.firstName)
      .setLastName(data.lastName)
      .setEmail(data.email)
      .setPhone(data.phone)
      .setCity(data.city)
      .setBirthday(data.birthday)
      .setIsPrivate(true)
      .setSubscribed(false)
      .build();
  }
}

const builder = new UserProfileBuilder();
const director = new UserProfileDirector(builder);

// Створюємо базовий профіль користувача
const basicProfile = director.buildBasicProfile(
  'Іван',
  'Семененко',
  'ivan.semenenko@example.com'
);

// Створюємо повний приватний профіль користувача
const fullProfile = director.buildFullPrivateProfile({
  firstName: 'Марія',
  lastName: 'Павленко',
  email: 'maria.pavlenko@example.com',
  phone: '+380931112233',
  city: 'Одеса',
  birthday: new Date(1994, 10, 22),
});

console.log(basicProfile);
console.log(fullProfile);