interface UserData {
  firstName: string;
  lastName: string;
}

function displayUser(user: UserData) {
  console.log(`Користувач: ${user.firstName} ${user.lastName}`);
}

type ApiUserResponse = {
  first_name: string;
  last_name: string;
};

const apiResponse: ApiUserResponse = {
  first_name: "Олена",
  last_name: "Петренко",
};

displayUser(apiResponse); // Некоректно