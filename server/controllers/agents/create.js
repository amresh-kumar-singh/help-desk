import Agents from "#root/models/agent";
import createErrorObject from "#root/utils/createErrorObject";

export default async function (req, res, next) {
  const { name, email, phone, description } = req.body;
  try {
    const agent = await Agents.create({ name, email, phone, description });

    res.status(201);
    return res.json({
      message: "Agent created successfully!",
      data: agent,
    });
  } catch (error) {
    const err = createErrorObject(error);
    next(err);
  }
}
