export default class ProductDTO {
  static getProductFrom = (product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    };
  };
  static getProductResponseFrom = (product) => {
    return {
      name: product.name,
      price: product.price,
      stock: product.stock,
    };
  };
}
