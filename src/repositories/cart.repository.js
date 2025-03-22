import Repositories from "./repository.manager.js";
import { cartDao } from "../dao/mongodb/cart.dao.js";

class CartRepository extends Repositories {
  constructor() {
    super(cartDao);
  }

  async getCartById(id) {
    return await this.getById(id);
  }

  async createCart() {
    return await this.dao.create();
  }

  async clearCart(cartId) {
    return await this.dao.clearCart(cartId);
  }

  async addProductToCart(cartId, prodId) {
    return await this.dao.addProdToCart(cartId, prodId);
  }

  async updateProductQuantity(cartId, prodId, quantity) {
    return await this.dao.updateProdQuantityToCart(cartId, prodId, quantity);
  }

  async removeProductFromCart(cartId, prodId) {
    return await this.dao.removeProdToCart(cartId, prodId);
  }
}

export const cartRepository = new CartRepository();
