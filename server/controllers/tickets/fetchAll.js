import Tickets from "#root/models/ticket";
import createErrorObject from "#root/utils/createErrorObject";

export default async function (req, res, next) {
  const {
    status,
    assignedTo,
    severity,
    type,
    sort,
    order,
    limit = 10,
    page = 1,
  } = req.query;
  try {
    // Sample URL with query params
    // localhost:3100/api/support-tickets?status=New&assignedTo=65a7fec57635b022974092cb&severity=Critical&type=test&sort=dateCreated&order=asc&limit=10&page=1

    const query = {};
    // Creating filter query
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
    if (severity) query.severity = severity;
    if (type) query.type = type;

    // Creating sort object
    const sortOrder = order === "desc" ? -1 : order === "asc" ? 1 : 0;
    // Checking if sorting is requested or not and also checking there is a valid order provided in query params
    const sortObj = sort && sortOrder && { [sort]: sortOrder };

    // No of documents to skip
    const skip = (page - 1) * limit;

    // const tickets = await Tickets.find(query)
    //   .sort(sortObj ? sortObj : {})
    //   .skip(skip)
    //   .limit(limit);
    const tickets = await Tickets.aggregate([
      { $match: { ...query } },
      {
        $lookup: {
          from: "agents",
          let: { assignedTo: "$assignedTo" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$assignedTo"] } } }],
          as: "agents",
        },
      },
      { $unwind: { path: "$agents", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          assigneeName: "$agents.name",
        },
      },
      ...(sortObj ? [{ $sort: sortObj }] : []),
      { $skip: Number(skip) },
      { $limit: Number(limit) },
    ]);
    res.status(201);
    return res.json({
      message: "Fetched all tickets successfully!",
      data: tickets,
    });
  } catch (error) {
    const err = createErrorObject(error);
    next(err);
  }
}
