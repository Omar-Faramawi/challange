import { Router } from "express";
import { createJob, getJob } from "../controllers/jobs.controller";

const router = Router();

router.post("/", createJob);

router.get("/:id", getJob);

export default router;
