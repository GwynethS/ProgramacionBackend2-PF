import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { passportCall, passportCallReset } from "../passport/passportCall.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/current", [passportCall("current")], userController.privateData);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", passportCallReset(), userController.resetPassword);


export default router;
