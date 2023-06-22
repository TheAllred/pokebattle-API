const express = require("express");
const router = express.Router();

const playerController = require("../controllers/players");

router.get("/", playerController.getAll);
router.get("/:id", playerController.getById);

router.post("/new", playerController.createNew);

router.put("/update/:id", playerController.updatePlayer);

router.delete("/delete/:id", playerController.deletePlayer);

module.exports = router;
