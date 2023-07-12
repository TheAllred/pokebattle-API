import express, { Router } from "express";
import {
  getAll,
  getById,
  updatePlayer,
  deletePlayer,
} from "../controllers/players";

const router: Router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.put("/update/:id", updatePlayer);

router.delete("/delete/:id", deletePlayer);

export default router;
