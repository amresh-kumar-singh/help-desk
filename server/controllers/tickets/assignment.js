import Tickets from "#root/models/ticket";
import createErrorObject from "#root/utils/createErrorObject";
import { getCurrentIndex } from "#root/controllers/settings";

import Agents from "#root/models/agent";
import Settings from "#root/models/setting";

export default async function (req, res, next) {
  const { ticketId } = req.body;

  try {
    if (!ticketId)
      throw new Error("No ticket id provided to update the assignedTo!");

    // Sorting all agents on dateCreated in increasing order, will assign card to current index user that we are maintaining on settings docs
    const currentIndex = await getCurrentIndex();

    // Mongo aggragation pipeline to get active user of as well as getting agent details at current index
    const pipeline = [
      { $match: { active: true } },
      // $facet allow multiple aggragation pipeline in one query
      {
        $facet: {
          activeAgentsCount: [{ $count: "totalDocument" }],
          agentAtCurrentIndex: [
            { $sort: { dateCreated: 1 } },
            { $skip: currentIndex },
            { $limit: 1 },
          ],
        },
      },
      {
        $project: {
          activeAgentsCount: {
            $arrayElemAt: ["$activeAgentsCount.totalDocument", 0],
          },
          agentAtCurrentIndex: {
            $arrayElemAt: ["$agentAtCurrentIndex", 0],
          },
        },
      },
    ];

    const agent = await Agents.aggregate(pipeline);

    // currentIndex should never get greater than total no of agents
    const activeAgentsCount = agent?.[0].activeAgentsCount;
    const agentAtCurrentIndex = agent?.[0].agentAtCurrentIndex;

    if (!agentAtCurrentIndex)
      throw new Error("No agent found to assign ticket!");

    // Assigning ticket to agentAtCurrentIndex
    const { modifiedCount, ...rest } = await Tickets.updateOne(
      { _id: ticketId },
      { $set: { assignedTo: agentAtCurrentIndex._id, status: "Assigned " } }
    );

    // Ticket is modified the update the currentIndex as well
    if (modifiedCount > 0) {
      let a = await Settings.updateOne(
        {},
        { $set: { currentIndex: (currentIndex + 1) % activeAgentsCount } }
      );
      res.status(201);
      return res.json({
        code: 200,
        message: "Assignee update successfully!",
        data: { assignedTo: agentAtCurrentIndex },
      });
    } else {
      throw new Error("Ticket assignedTo is not updated!");
    }
  } catch (error) {
    const err = createErrorObject(error);
    next(err);
  }
}
