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

  setPhone(phone: string): this {
    this.phone = phone;
    return this;
  }

  setCity(city: string): this {
    this.city = city;
    return this;
  }

  setBirthday(birthday: Date): this {
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

const userProfile = new UserProfileBuilder()
  .setFirstName('Олена')
  .setLastName('Петренко')
  .setEmail('olena.petrenko@example.com')
  .setPhone('+380501234567')
  .setCity('Львів')
  .setBirthday(new Date(1992, 6, 15))
  .setIsPrivate(true)
  .setSubscribed(false)
  .build();

console.log(userProfile);