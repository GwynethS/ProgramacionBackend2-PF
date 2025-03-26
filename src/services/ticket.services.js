import Services from "./service.manager.js";
import { ticketRepository } from "../repositories/product.repository.js";
class TicketService extends Services {
  constructor() {
    super(ticketRepository);
  }
}

export const ticketService = new TicketService();
