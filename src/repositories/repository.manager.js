export default class Repositories {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll(params) {
    return this.dao.get(params);
  }

  async getBy(params) {
    return this.dao.getBy(params);
  }

  async create (doc) {
    return this.dao.create(doc);
  };

  async update (id, doc) {
    return this.dao.update(id, doc);
  };

  async delete (id) {
    return this.dao.delete(id);
  };
}
