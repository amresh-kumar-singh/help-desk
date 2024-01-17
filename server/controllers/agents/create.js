import Agents from "#root/models/agent";

export default async function (req, res, next) {
  const { name, email, phone, description } = req.body;
  console.log("interested");
  try {
    const agent = await Agents.create({ name, email, phone, description });

    res.status(201);
    return res.json({
      message: "Agent created successfully!",
      data: agent,
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
