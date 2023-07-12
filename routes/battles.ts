import express, { Router } from "express";
import {
  getAll,
  getById,
  createNew,
  startNewBattle,
  listTurn,
  updateBattle,
  deleteBattle,
} from "../controllers/battles";

const router: Router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post("/new", createNew);
router.post("/start", startNewBattle);
router.get("/turn/:battleID", listTurn);

router.put("/update/:id", updateBattle);

router.delete("/delete/:id", deleteBattle);

export default router;
