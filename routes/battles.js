const express = require("express");
const router = express.Router();

const battleController = require("../controllers/battles");

router.get("/", battleController.getAll);
router.get("/:id", battleController.getById);

router.post("/new", battleController.createNew);

router.put("/update/:id", battleController.updateBattle);

router.delete("/delete/:id", battleController.deleteBattle);

module.exports = router;
