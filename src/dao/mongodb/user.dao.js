import userModel from "../models/user.model.js";
import MongoDao from "./mongo.dao.js";

class UserDaoMongo extends MongoDao {
  constructor() {
    super(userModel);
  }

  async register(user) {
    try {
      return await this.model.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("cart");
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userDao = new UserDaoMongo();
