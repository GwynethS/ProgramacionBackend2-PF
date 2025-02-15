import MongoDao from "./mongo.dao.js";
import { ProductModel } from "../models/product.model.js";

class ProductDaoMongo extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  async findByQuery(query = {}) {
    try {
      const result = await this.model.find(query);

      return result;
    } catch (e) {
      throw new Error(error);
    }
  }
}

export const prodDao = new ProductDaoMongo();
