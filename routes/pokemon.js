const express = require("express");
const router = express.Router();

const pokemonController = require("../controllers/pokemon");

router.get("/", pokemonController.getAll);
router.get("/:name", pokemonController.getByName);

router.post("/new", pokemonController.createNew);

router.put("/update/:id", pokemonController.updatePokemon);

router.delete("/delete/:id", pokemonController.deletePokemon);

module.exports = router;
