import { model, Schema } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    min: 0,
  },
  stock: {
    type: Number,
    require: true,
    min: 0,
  },
});

export const ProductModel = model(productCollection, productSchema);
