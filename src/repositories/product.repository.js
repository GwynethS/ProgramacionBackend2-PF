import Repositories from "./repository.manager.js";
import { prodDao } from "../dao/mongodb/product.dao.js";
import ProductDTO from "../dto/product.dto.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enum.js";

class ProductRepository extends Repositories {
  constructor() {
    super(prodDao);
  }

  async create(productData) {
    const productDTO = ProductDTO.getProductFrom(productData);

    const newProduct = await this.dao.create(productDTO);

    return newProduct;
  }

  async getProductById(id) {
    const product = await this.dao.getById(id);

    if (!product) {
      throw CustomError.createError({
        name: "ProductNotFoundError",
        cause: `Product with ID ${id} not found.`,
        message: "Product not found",
        code: EErrors.NOT_FOUND,
      });
    }

    return ProductDTO.getProductResponseFrom(product);
  }

  async getProductsByQuery(query = {}) {
    return await this.dao.findByQuery(query);
  }
}

export const productRepository = new ProductRepository();
