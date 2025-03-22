import { createHash, isValidPassword } from "../utils.js";
import Services from "./service.manager.js";
import { userRepository } from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { cartService } from "./cart.services.js";
import UserDTO from "../dto/user.dto.js";


class UserService extends Services {
  constructor() {
    super(userRepository);
  }

  getUserById = async (id) => {
    try {
      const user = await this.repository.getUserById(id);
      if (!user) throw new Error(`User with ID ${id} not found`);
      return user;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const payload = UserDTO.getUserTokenFrom(user);

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
  };

  register = async (user) => {
    try {
      const { email, password } = user;

      const existUser = await this.repository.getUserByEmail(email);
      if (existUser) throw new Error("User already exists");

      const cartUser = await cartService.createCart();

      const newUser = await this.repository.create({
        ...user,
        password: createHash(password),
        cart: cartUser._id,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;

      const userExist = await this.repository.getUserByEmail(email);

      if (!userExist) throw new Error("User not found");

      const passValid = isValidPassword(password, userExist);

      if (!passValid) throw new Error("Incorrect credentials");

      return this.generateToken(userExist);
    } catch (error) {
      throw error;
    }
  };

  // generateToken = (user) => {
  //   const payload = {
  //     _id: user._id,
  //     // first_name: user.first_name,
  //     // last_name: user.last_name,
  //     // email: user.email,
  //     // age: user.age,
  //     // role: user.role,
  //     // cart: user.cart,
  //   };

  //   return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
  // };

  // getUserByEmail = async (email) => {
  //   try {
  //     return await this.dao.getByEmail(email);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // register = async (user) => {
  //   try {
  //     const { email, password } = user;

  //     const existUser = await this.getUserByEmail(email);
  //     if (existUser) throw new Error("User already exists");

  //     const cartUser = await cartService.createCart();

  //     const newUser = await this.dao.register({
  //       ...user,
  //       password: createHash(password),
  //       cart: cartUser._id,
  //     });

  //     return newUser;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // login = async (user) => {
  //   try {
  //     const { email, password } = user;

  //     const userExist = await this.getUserByEmail(email);

  //     if (!userExist) throw new Error("User not found");

  //     const passValid = isValidPassword(password, userExist);

  //     if (!passValid) throw new Error("incorrect credentials");

  //     return this.generateToken(userExist);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
}

export const userService = new UserService();
