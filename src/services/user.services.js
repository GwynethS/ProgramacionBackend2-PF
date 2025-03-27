import { createHash, isValidPassword } from "../utils.js";
import Services from "./service.manager.js";
import { userRepository } from "../repositories/user.repository.js";
import { cartService } from "./cart.services.js";
import { emailService } from "./email.services.js";
import UserDTO from "../dto/user.dto.js";
import CustomError from "./errors/custom-error.js";
import EErrors from "./errors/enum.js";

import jwt from "jsonwebtoken";
import "dotenv/config";

class UserService extends Services {
  constructor() {
    super(userRepository);
  }

  getUserById = async (id) => {
    try {
      const user = await this.repository.getUserById(id);
      if (!user)
        throw CustomError.createError({
          name: "UserNotFoundError",
          cause: `User with ID ${id} not found.`,
          message: "User not found",
          code: EErrors.NOT_FOUND,
        });
      return user;
    } catch (error) {
      throw error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await this.repository.getUserByEmail(email);
      if (!user)
        throw CustomError.createError({
          name: "UserNotFoundError",
          cause: `User with Email ${email} not found.`,
          message: "User not found",
          code: EErrors.NOT_FOUND,
        });
      return user;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const payload = UserDTO.getUserTokenFrom(user);

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
  };

  generateResetToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });
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

      if (!userExist)
        throw CustomError.createError({
          name: "UserNotFoundError",
          cause: `User with Email ${email} not found.`,
          message: "User not found",
          code: EErrors.NOT_FOUND,
        });

      const passValid = isValidPassword(password, userExist);

      if (!passValid) throw new Error("Incorrect credentials");

      return this.generateToken(userExist);
    } catch (error) {
      throw error;
    }
  };

  forgotPassword = async (email) => {
    try {
      const user = await this.repository.getUserByEmail(email);
      if (!user)
        throw CustomError.createError({
          name: "UserNotFoundError",
          cause: `User with Email ${email} not found.`,
          message: "User not found",
          code: EErrors.NOT_FOUND,
        });

      const resetToken = this.generateResetToken(email);

      const resetLink = `http://localhost:${process.env.PORT}/reset-password`;
      await emailService.sendEmail(
        email,
        "Recuperación de Contraseña",
        `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
          <a href="${resetLink}">Restablecer Contraseña</a>
          <p>Este enlace expirará en 1 hora.</p>`
      );

      return resetToken;
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async (email, newPassword) => {
    try {
      const user = await this.repository.getUserByEmail(email);
      if (!user)
        throw CustomError.createError({
          name: "UserNotFoundError",
          cause: `User with Email ${email} not found.`,
          message: "User not found",
          code: EErrors.NOT_FOUND,
        });

      const samePassword = isValidPassword(newPassword, user);

      if (samePassword)
        throw new Error("New password can't be the same as the old one");

      user.password = createHash(newPassword);

      const updatedUser = await this.repository.update(user._id, user);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService();
