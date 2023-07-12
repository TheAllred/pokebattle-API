import express, { Router } from "express";
import {
  getAll,
  getById,
  createNew,
  updateStadium,
  deleteStadium,
} from "../controllers/stadiums";

const router: Router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post("/new", createNew);

router.put("/update/:id", updateStadium);

router.delete("/delete/:id", deleteStadium);

export default router;
