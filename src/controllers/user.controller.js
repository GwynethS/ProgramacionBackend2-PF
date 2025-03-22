import Controllers from "./controller.manager.js";
import { userService } from "../services/user.services.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enum.js";

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

      res.json({ user });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();
