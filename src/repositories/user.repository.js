import Repositories from "./repository.manager.js";
import { userDao } from "../dao/mongodb/user.dao.js";

class UserRepository extends Repositories {
  constructor() {
    super(userDao);
  }

  async getUserById(id) {
    return await this.getBy({ _id: id });
  };

  async getUserByEmail(email) {
    return await this.getBy({ email });
  }
}

export const userRepository = new UserRepository();
