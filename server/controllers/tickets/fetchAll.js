import Tickets from "#root/models/ticket";

export default async function (req, res, next) {
  const {
    status,
    assignedTo,
    severity,
    type,
    sort,
    limit = 10,
    page = 1,
  } = req.query;
  try {
    const query = {};
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
    if (severity) query.severity = severity;
    if (type) query.type = type;

    const ticket = await Tickets.find(query);

    res.status(201);
    return res.json({
      message: "Fetched all tickets successfully!",
      data: ticket,
    });
  } catch (error) {
    const err = {};
    err.code = 400;
    err.message = error.message;
    // In case of unknown error also setting whole error to err object for debugging
    err.error = error;
    next(err);
  }
}
