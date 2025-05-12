// Структура, яку очікує система
interface UserData {
  firstName: string;
  lastName: string;
}

// Структура з API
type ApiUserResponse = {
  first_name: string;
  last_name: string;
};

// Функціональний адаптер
function adaptUser(response: ApiUserResponse): UserData {
  return {
    firstName: response.first_name,
    lastName: response.last_name,
  };
}

// Клієнтський код
function renderUser(user: UserData): void {
  console.log(`Користувач: ${user.firstName} ${user.lastName}`);
}

const apiResponse: ApiUserResponse = {
  first_name: "Юрій",
  last_name: "Ковальчук",
};

const adapted = adaptUser(apiResponse);
renderUser(adapted);
