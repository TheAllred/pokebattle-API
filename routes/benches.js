const express = require("express");
const router = express.Router();

const benchController = require("../controllers/benches");

router.get("/", benchController.getAll);
router.get("/:id", benchController.getById);
router.get("/byOwner/:email", benchController.getBenchByOwner);

router.post("/new", benchController.createNew);

router.put("/update/:id", benchController.updateBench);

router.delete("/delete/:id", benchController.deleteBench);

module.exports = router;
