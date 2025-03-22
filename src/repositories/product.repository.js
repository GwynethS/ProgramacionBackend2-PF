import Repositories from "./repository.manager.js";
import { prodDao } from "../dao/mongodb/product.dao.js";
import ProductDTO from "../dto/product.dto.js";

class ProductRepository extends Repositories {
  constructor() {
    super(prodDao);
  }

  async create(productData) {
    const productDTO = new ProductDTO.getProductFrom(productData);
    
    const newProduct = await this.dao.create(productDTO);
    
    return newProduct;
  }

  async getProductById(id) {
    const product = await this.dao.getById(id);
    
    if (!product) throw new Error("Product not found");

    return ProductDTO.getProductResponseFrom(product);
  }

  async getProductsByQuery(query = {}) {
    return await this.dao.findByQuery(query);
  }
}

export const productRepository = new ProductRepository();
