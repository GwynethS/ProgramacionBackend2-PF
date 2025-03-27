import Controllers from "./controller.manager.js";
import { userService } from "../services/user.services.js";
import { emailService } from "../services/email.services.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enum.js";
import UserDTO from "../dto/user.dto.js";

class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const { email, password, first_name, last_name } = req.body;

      if (!email || !password || !first_name || !last_name) {
        return next(
          CustomError.createError({
            name: "MissingFieldsError",
            cause: "Some required fields are missing.",
            message: "Email, password, first name, and last name are required.",
            code: EErrors.INVALID_TYPE,
          })
        );
      }

      const user = await this.service.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          CustomError.createError({
            name: "MissingCredentialsError",
            cause: "Email or password is missing.",
            message: "Both email and password are required.",
            code: EErrors.INVALID_TYPE,
          })
        );
      }

      const token = await this.service.login(req.body);
      res
        .cookie("token", token, { httpOnly: true })
        .json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }
  };

  privateData = async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return next(
          CustomError.createError({
            name: "UserNotFoundError",
            cause: `User data not found.`,
            message: "User not found",
            code: EErrors.NOT_FOUND,
          })
        );
      }

      const safeUser = UserDTO.getSafeUserData(user);

      res.json({ user: safeUser });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      console.log(email);

      if (!email) {
        return next(
          CustomError.createError({
            name: "MissingEmailError",
            cause: "Email is missing.",
            message: "Email is required.",
            code: EErrors.INVALID_TYPE,
          })
        );
      }

      const token = await this.service.forgotPassword(email);
      res
        .cookie("resetToken", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        .json({ message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      const email = req.user.email; 

      const result = await userService.resetPassword(email, newPassword);

      if (!result) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      res.clearCookie("resetToken");

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();
