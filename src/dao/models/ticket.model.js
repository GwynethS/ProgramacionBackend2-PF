import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = "tickets";

const ticketSchema = mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  }
});

ticketSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = uuidv4();
  }
  next();
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
