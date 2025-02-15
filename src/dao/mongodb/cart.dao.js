import MongoDao from "./mongo.dao.js";
import { CartModel } from "../models/cart.model.js";

export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async create() {
    try {
      return await this.model.create({
        products: [],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await this.model.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCart(cartId) {
    try {
      const updatedCart = await this.model
        .findByIdAndUpdate(cartId, { $set: { products: [] } }, { new: true })
        .populate("products.product");

      if (!updatedCart) throw new Error("Cart not found");

      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
      const cart = await this.model.findById(cartId);
      const product = await ProductModel.findById(prodId);

      if (!cart) throw new Error("Cart not found");

      if (!product) throw new Error("Product not found");

      const existingProduct = cart["products"].find(
        (p) => p["product"].toString() === prodId
      );

      if (!existingProduct) {
        const insertProduct = {
          product: prodId,
          quantity: 1,
        };

        cart["products"].push(insertProduct);
      } else {
        existingProduct.quantity += 1;
      }

      const updatedCart = await this.model
        .findByIdAndUpdate(cartId, cart, { new: true })
        .populate("products.product");

      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const cart = await this.model.findById(cartId);
      const product = await ProductModel.findById(prodId);

      if (!cart) throw new Error("Cart not found");

      if (!product) throw new Error("Product not found");

      const existingProduct = cart["products"].find(
        (p) => p["product"].toString() === prodId
      );

      if (!existingProduct) {
        const insertProduct = {
          product: prodId,
          quantity,
        };

        cart["products"].push(insertProduct);
      } else {
        existingProduct.quantity = quantity;
      }

      const updatedCart = await this.model
        .findByIdAndUpdate(cartId, cart, { new: true })
        .populate("products.product");

      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdToCart(cartId, prodId) {
    try {
      const updatedCart = await this.model
        .findByIdAndUpdate(
          cartId,
          { $pull: { products: { product: prodId } } },
          { new: true }
        )
        .populate("products.product");

      if (!updatedCart) throw new Error("Cart not found");

      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
