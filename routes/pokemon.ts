import express, { Router } from "express";
import {
  getAll,
  getByName,
  createNew,
  updatePokemon,
  deletePokemon,
} from "../controllers/pokemon";

const router: Router = express.Router();

router.get("/", getAll);
router.get("/:name", getByName);

router.post("/new", createNew);

router.put("/update/:id", updatePokemon);

router.delete("/delete/:id", deletePokemon);

export default router;
