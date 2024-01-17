import { Router } from "express";
const router = Router();
import agents from "#root/controllers/agents/create";
import assignment from "#root/controllers/tickets/assignment";

router.post("/", agents);
router.post("/assignment", assignment);

export default router;
