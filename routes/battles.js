const express = require("express");
const router = express.Router();

const battleController = require("../controllers/battles");

router.get("/", battleController.getAll);
router.get("/:id", battleController.getById);

router.post("/new", battleController.createNew);
router.post("/start", battleController.startNewBattle);
router.get("/turn/:battleID", battleController.listTurn);

router.put("/update/:id", battleController.updateBattle);

router.delete("/delete/:id", battleController.deleteBattle);

module.exports = router;
