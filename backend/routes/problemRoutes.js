import express from "express";
import { getAllProblems, getProblem, createProblem, updateProblem, deleteProblem } from "../controllers/problemController.js";

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id", getProblem);
router.post("/", createProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

export default router;