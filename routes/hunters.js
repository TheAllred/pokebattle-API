const express = require("express");
const router = express.Router();

const huntersController = require("../controllers/hunters");

router.get("/", huntersController.getAll);

router.post("/new", huntersController.createNew);

router.put("/update/:id", huntersController.updateHunter);

router.delete("/delete/:id", huntersController.deleteHunter);

module.exports = router;
