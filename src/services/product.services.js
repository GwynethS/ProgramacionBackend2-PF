import Services from "./service.manager.js";
import { productRepository } from "../repositories/product.repository.js";
class ProductService extends Services {
  constructor() {
    super(productRepository);
  }

  async getById(id) {
    try {
      const product = await this.repository.getProductById(id);

      if (!product) {
        throw CustomError.createError({
          name: "ProductNotFoundError",
          cause: `Product with ID ${id} not found.`,
          message: "Product not found",
          code: EErrors.NOT_FOUND,
        });
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByQuery(query = {}) {
    try {
      return await this.repository.getProductsByQuery(query);
    } catch (error) {
      throw error;
    }
  }
}

export const productService = new ProductService();
