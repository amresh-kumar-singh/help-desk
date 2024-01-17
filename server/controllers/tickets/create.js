import Tickets from "#root/models/ticket";

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
    const err = {};
    switch (error.name) {
      case "ValidationError":
        err.code = 403;
        err.message = Object.values(error.errors)[0].message;
        break;
      case "MongoServerError":
        err.code = 403;
        if (error.code === 11000)
          err.message = `${Object.keys(
            error.keyValue
          )} with value ${Object.values(error.keyValue)} already exits!`;
        break;
      default:
        err.code = 400;
        err.message = error.message;
        // In case of unknown error also setting whole error to err object for debugging
        err.error = error;
    }
    next(err);
  }
}
