import Controllers from "./controller.manager.js";
import { cartService } from "../services/cart.services.js";

class CartController extends Controllers {
  constructor() {
    super(cartService);
  }

  getCartById = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.service.getCartById(cid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  createCart = async (req, res, next) => {
    try {
      const response = await this.service.createCart();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.clearCart(id);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;

      const response = await this.service.addProdToCart(cid, pid);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const response = await this.service.updateProdQuantityToCart(
        cid,
        pid,
        quantity
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;

      const response = await this.service.removeProdToCart(cid, pid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  purchaseCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { user } = req;

      const response = await this.service.purchaseCart(cid, user.email);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const cartController = new CartController();
