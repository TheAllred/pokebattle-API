import express, { Router } from "express";
import playerController from "../controllers/players";
import pokemonRouter from "./pokemon";
import playersRouter from "./players";
import benchesRouter from "./benches";
import stadiumsRouter from "./stadiums";
import battlesRouter from "./battles";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger-output.json";
import { requiresAuth } from "express-openid-connect";

const router: Router = express.Router();

router.use("/pokemon", pokemonRouter);
router.use("/players", playersRouter);
router.use("/benches", benchesRouter);
router.use("/stadiums", stadiumsRouter);
router.use("/battles", battlesRouter);

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/profile", requiresAuth(), playerController.buildProfile);

export default router;
