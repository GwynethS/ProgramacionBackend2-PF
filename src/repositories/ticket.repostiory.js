import Repositories from "./repository.manager.js";
import { ticketDao } from "../dao/mongodb/ticket.dao.js";

class TicketRepository extends Repositories {
  constructor() {
    super(ticketDao);
  }
}

export const ticketRepository = new TicketRepository();
