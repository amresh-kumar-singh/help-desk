import { Router } from "express";
const router = Router();
import agents from "#root/controllers/agents/create";

router.post("/", agents);

export default router;
