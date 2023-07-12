import express, { Router } from "express";
import {
  getAll,
  getById,
  getBenchByOwner,
  createNew,
  updateBench,
  deleteBench,
} from "../controllers/benches";

const router: Router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/byOwner/:email", getBenchByOwner);

router.post("/new", createNew);

router.put("/update/:id", updateBench);

router.delete("/delete/:id", deleteBench);

export default router;
