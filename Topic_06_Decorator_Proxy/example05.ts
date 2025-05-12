interface WithUserRole {
  userRole: string;
}

function WithRole<T extends { new (...args: any[]): {} }>(role: string) {
  return function (Base: T) {
    return class extends Base implements WithUserRole {
      userRole = role;
    };
  };
}

@WithRole("admin")
class AdminPanel {}

@WithRole("user")
class UserDashboard {}

const admin = new AdminPanel() as AdminPanel & WithUserRole;
console.log(admin.userRole); 

const user = new UserDashboard() as UserDashboard & WithUserRole;
console.log(user.userRole);
