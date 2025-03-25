import Repositories from "./repository.manager.js";
import { cartDao } from "../dao/mongodb/cart.dao.js";

class CartRepository extends Repositories {
  constructor() {
    super(cartDao);
  }

  async getCartById(id) {
    return await this.dao.getCartById(id);
  }

  async createCart() {
    return await this.dao.create();
  }
}

export const cartRepository = new CartRepository();
