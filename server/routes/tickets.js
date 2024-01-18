import { Router } from "express";
import create from "#root/controllers/tickets/create";
import fetchAll from "#root/controllers/tickets/fetchAll";
import assignment from "#root/controllers/tickets/assignment";
const router = Router();

router.get("/", fetchAll);
router.post("/", create);
router.post("/assignment", assignment);

export default router;
