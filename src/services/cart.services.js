import Services from "./service.manager.js";
import { cartRepository } from "../repositories/cart.repository.js";
import CustomError from "./errors/custom-error.js";
import EErrors from "./errors/enum.js";
import { productRepository } from "../repositories/product.repository.js";

class CartServices extends Services {
  constructor() {
    super(cartRepository);
  }

  getCartById = async (cartId) => {
    try {
      const cart = await this.repository.getCartById(cartId);

      if (!cart)
        throw CustomError.createError({
          name: "CartNotFoundError",
          cause: `Cart with ID ${cartId} not found.`,
          message: "Cart not found",
          code: EErrors.NOT_FOUND,
        });

      return cart;
    } catch (error) {
      throw error;
    }
  };

  createCart = async () => {
    try {
      return await this.repository.createCart();
    } catch (error) {
      throw error;
    }
  };

  clearCart = async (cartId) => {
    try {
      const cart = await this.repository.getCartById(cartId);

      if (!cart)
        throw CustomError.createError({
          name: "CartNotFoundError",
          cause: `Cart with ID ${cartId} not found.`,
          message: "Cart not found",
          code: EErrors.NOT_FOUND,
        });

      return await this.update(cartId, { products: [] });
    } catch (error) {
      throw error;
    }
  };

  addProdToCart = async (cartId, prodId) => {
    try {
      const cart = await this.repository.getCartById(cartId);
      const product = await productRepository.getProductById(prodId);

      if (!cart)
        throw CustomError.createError({
          name: "CartNotFoundError",
          cause: `Cart with ID ${cartId} not found.`,
          message: "Cart not found",
          code: EErrors.NOT_FOUND,
        });

      if (!product)
        throw CustomError.createError({
          name: "ProductNotFoundError",
          cause: `Product with ID ${prodId} not found.`,
          message: "Product not found",
          code: EErrors.NOT_FOUND,
        });

      const existingProduct = cart.products.find(
        (p) => p.product._id.toString() === prodId
      );

      if (!existingProduct) {
        cart.products.push({ product: prodId, quantity: 1 });
      } else {
        existingProduct.quantity += 1;
      }

      return await this.update(cartId, cart);
    } catch (error) {
      throw error;
    }
  };

  updateProdQuantityToCart = async (cartId, prodId, quantity) => {
    try {
      const cart = await this.repository.getCartById(cartId);

      if (!cart)
        throw CustomError.createError({
          name: "CartNotFoundError",
          cause: `Cart with ID ${cartId} not found.`,
          message: "Cart not found",
          code: EErrors.NOT_FOUND,
        });

      const existingProduct = cart.products.find(
        (p) => p.product._id.toString() === prodId
      );

      if (!existingProduct) {
        cart.products.push({ product: prodId, quantity });
      } else {
        existingProduct.quantity = quantity;
      }

      return await this.repository.update(cartId, cart);
    } catch (error) {
      throw error;
    }
  };

  removeProdToCart = async (cartId, prodId) => {
    try {
      const cart = await this.repository.getCartById(cartId);
      if (!cart)
        throw CustomError.createError({
          name: "CartNotFoundError",
          cause: `Cart with ID ${cartId} not found.`,
          message: "Cart not found",
          code: EErrors.NOT_FOUND,
        });

      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== prodId
      );

      return await this.update(cartId, cart);
    } catch (error) {
      throw error;
    }
  };
}

export const cartService = new CartServices();
