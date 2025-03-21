export default class Services {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    try {
      const response = await this.repository.getAll();
      if (!response) throw new Error("Error get all");
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await this.repository.getById(id);
      if (!response) throw new Error("Error getById");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await this.repository.create(obj);
      if (!response) throw new Error("Error create");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await this.repository.update(id, obj);
      if (!response) throw new Error("Error update");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await this.repository.delete(id);
      if (!response) throw new Error("Error delete");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
