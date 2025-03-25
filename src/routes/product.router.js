import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from "../middlewares/roleAuth.js";

const router = Router();

router.get("/:pid", productController.getById);
router.post(
  "/",
  passportCall("current"),
  roleAuth("admin"),
  productController.create
);
router.put(
  "/:pid",
  passportCall("current"),
  roleAuth("admin"),
  productController.update
);
router.delete(
  "/:pid",
  passportCall("current"),
  roleAuth("admin"),
  productController.delete
);

export default router;
