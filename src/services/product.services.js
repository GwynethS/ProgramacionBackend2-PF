import Services from "./service.manager.js";
import { prodDao } from "../dao/mongodb/product.dao.js";

class ProductService extends Services {
  constructor() {
    super(prodDao);
  }
}

export const prodService = new ProductService();
