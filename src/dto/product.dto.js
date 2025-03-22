export default class ProductDTO {
  static getProductFrom = (product) => {
    return {
      nombre: product.name,
      descripcion: product.description,
      precio: product.price,
      disponibilidad: product.stock,
    };
  };
  static getProductResponseFrom = (product) => {
    return {
      nombre: product.name,
      precio: product.price,
      disponibilidad: product.stock,
    };
  };
}
