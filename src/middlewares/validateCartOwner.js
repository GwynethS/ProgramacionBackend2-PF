import { cartService } from "../services/cart.services.js";
import { userService } from "../services/user.services.js";

export const validateCartOwner = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const cartId = req.params.cid;

    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const user = await userService.getUserById(userId);

    if (!user || !user.cart || user.cart._id.toString() !== cartId) {
      return res.status(403).json({ error: "You don't own this cart" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};