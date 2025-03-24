import Controllers from "./controller.manager.js";
import { productService } from "../services/product.services.js";
import CustomError from "../services/errors/custom-error.js";
import EErrors from "../services/errors/enum.js";

class ProductController extends Controllers {
  constructor() {
    super(productService);
  }

  getById =  async(req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  create = async (req, res, next) => {
    try {
      const { name, description, price, stock } = req.body;

      if (!name || !description || !price || !stock) {
        return next(
          CustomError.createError({
            name: "MissingFieldsError",
            cause: "Some required fields are missing.",
            message: "Name, description, price, and stock are required.",
            code: EErrors.INVALID_TYPE,
          })
        );
      }
      
      const response = await this.service.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const productData = req.body;

      const product = await this.service.getById(id);

    if (!product) {
      throw CustomError.createError({
        name: "ProductNotFoundError",
        cause: `Product with ID ${id} not found.`,
        message: "Product not found",
        code: EErrors.NOT_FOUND,
      });
    }

      const response = await this.service.update(id, productData);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await this.service.getById(id);

    if (!product) {
      throw CustomError.createError({
        name: "ProductNotFoundError",
        cause: `Product with ID ${id} not found.`,
        message: "Product not found",
        code: EErrors.NOT_FOUND,
      });
    }

      const response = await this.service.delete(id);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
