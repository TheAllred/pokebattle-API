const express = require("express");
const router = express.Router();

const ducksController = require("../controllers/ducks");

router.get("/", ducksController.getAll);

router.post("/new", ducksController.createNew);

router.put("/update/:id", ducksController.updateDuck);

router.delete("/delete/:id", ducksController.deleteDuck);

module.exports = router;
