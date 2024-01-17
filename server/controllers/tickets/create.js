import Tickets from "#root/models/ticket";
import createErrorObject from "#root/utils/createErrorObject";

export default async function (req, res, next) {
  const { topic, severity, type, description, assignedTo, status } = req.body;

  try {
    const ticket = await Tickets.create({
      topic,
      severity,
      type,
      description,
      assignedTo,
      status,
    });

    res.status(201);
    return res.json({
      message: "Ticket created successfully!",
      data: ticket,
    });
  } catch (error) {
    const err = createErrorObject(error);
    next(err);
  }
}
