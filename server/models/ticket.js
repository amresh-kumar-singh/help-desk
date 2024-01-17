import mongoose from "mongoose";
import statuses from "#root/info/tickets/statuses";
import severities from "#root/info/tickets/severities";

const ticketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, "A ticket must have a topic!"],
  },
  description: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  severity: {
    type: String,
    enum: severities,
  },
  type: {
    type: String,
  },
  assignedTo: {
    type: mongoose.ObjectId,
  },
  status: {
    type: String,
    enum: statuses,
    default: "New",
  },
  resolvedOn: {
    type: Date,
  },
});

export default mongoose.model("Tickets", ticketSchema);
