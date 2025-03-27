export default class UserDTO {
  static getUserTokenFrom = (user) => {
    return {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      role: user.role,
      email: user.email,
    };
  };

  static getSafeUserData = (user) => {
    return {
      name: user.name,
      role: user.role,
      email: user.email,
    };
  };
}
