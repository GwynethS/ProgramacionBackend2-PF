import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from "../middlewares/roleAuth.js";
import { validateCartOwner } from "../middlewares/validateCartOwner.js";

const router = Router();

router.get("/:cid", cartController.getCartById);
router.post("/", cartController.createCart);
router.delete("/:cid", cartController.clearCart);
router.post(
  "/:cid/products/:pid",
  passportCall("current"),
  roleAuth("user"), validateCartOwner,
  cartController.addProdToCart
);
router.put(
  "/:cid/products/:pid",
  passportCall("current"),
  roleAuth("user"), validateCartOwner,
  cartController.updateProdQuantityToCart
);
router.delete(
  "/:cid/products/:pid",
  passportCall("current"),
  roleAuth("user"), validateCartOwner,
  cartController.removeProdToCart
);

export default router;
