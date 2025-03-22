import Services from "./service.manager.js";
import { productRepository } from "../repositories/product.repository.js";
class ProductService extends Services {
  constructor() {
    super(productRepository);
  }

  async create(productData) {
    try {
      const newProduct = await this.repository.create(productData);

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await this.repository.getProductById(id);

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
