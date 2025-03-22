import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.post("/", productController.create);
router.get("/:id",productController.getById);

export default router;
