import userModel from "../models/user.model.js";
import MongoDao from "./mongo.dao.js";

class UserDaoMongo extends MongoDao {
  constructor() {
    super(userModel);
  }

  async get(params = {}) {
    try {
      return await this.model.find(params);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBy(params) {
    try {
      return await this.model.findOne(params).populate("cart");
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(user) {
    try {
      return await this.model.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, user) {
    try {
      return await this.model.findByIdAndUpdate(id, user, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  // async register(user) {
  //   try {
  //     return await this.model.create(user);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async getById(id) {
  //   try {
  //     return await this.model.findById(id).populate("cart");
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async getByEmail(email) {
  //   try {
  //     return await this.model.findOne({ email });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

export const userDao = new UserDaoMongo();
