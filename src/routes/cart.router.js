import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";

const router = Router();

router.get("/:cid", cartController.getCartById);
router.post("/", cartController.createCart);
router.delete("/:cid", cartController.clearCart);
router.post("/:cid/products/:pid", cartController.addProdToCart);
router.put("/:cid/products/:pid", cartController.updateProdQuantityToCart);
router.delete("/:cid/products/:pid", cartController.removeProdToCart);

export default router;
