const express = require("express");
const router = express.Router();

const stadiumController = require("../controllers/stadiums");

router.get("/", stadiumController.getAll);
router.get("/:id", stadiumController.getById);

router.post("/new", stadiumController.createNew);

router.put("/update/:id", stadiumController.updateStadium);

router.delete("/delete/:id", stadiumController.deleteStadium);

module.exports = router;
