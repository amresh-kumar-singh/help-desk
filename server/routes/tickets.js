import { Router } from "express";
import create from "#root/controllers/tickets/create";
import fetchAll from "#root/controllers/tickets/fetchAll";
const router = Router();

router.get("/", fetchAll);
router.post("/", create);

export default router;
