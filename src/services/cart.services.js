import Services from "./service.manager.js";
import { cartRepository } from "../repositories/cart.repository.js";

class CartServices extends Services {
  constructor() {
    super(cartRepository);
  }

  createCart = async () => {
    try {
      return await this.repository.createCart();
    } catch (error) {
      throw error;
    }
  };

  clearCart = async (cartId) => {
    try {
      return await this.repository.clearCart(cartId);
    } catch (error) {
      throw error;
    }
  };

  addProdToCart = async (cartId, prodId) => {
    try {
      return await this.repository.addProductToCart(cartId, prodId);
    } catch (error) {
      throw error;
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      return await this.repository.updateProductQuantity(cartId, prodId, quantity);
    } catch (error) {
      throw error;
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      return await this.repository.removeProductFromCart(cartId, prodId);
    } catch (error) {
      throw error;
    }
  };
}

export const cartService = new CartServices();
