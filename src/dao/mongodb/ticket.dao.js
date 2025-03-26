import MongoDao from "./mongo.dao.js";
import TicketModel from "../models/ticket.model.js";

class TicketDaoMongoDB extends MongoDao {
  constructor() {
    super(TicketModel);
  }
}

export const ticketDao = new TicketDaoMongoDB();
