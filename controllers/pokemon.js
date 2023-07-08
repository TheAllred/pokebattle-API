const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("pokemon").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all pokemon." });
  }
};

const getByName = async (req, res, next) => {
  const name = req.params.name;
  console.log(name);
  const result = await mongodb
    .getDb()
    .db()
    .collection("pokemon")
    .find({ name: name });

  const lists = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  const item = lists[0];
  if (item) {
    res.status(200).json(item);
  } else {
    res.sendStatus(404);
  }
};

const createNew = async (req, res, next) => {
  const newPokemon = {
    name: req.body.name,
    type: req.body.type,
    hp: req.body.hp,
    weight: req.body.weight,
    height: req.body.height,
    moves: req.body.moves,
    weaknesses: req.body.weaknesses,
    resistances: req.body.resistances,
  };
  if (
    !req.body.name ||
    !req.body.type ||
    !req.body.hp ||
    !req.body.weight ||
    !req.body.height ||
    !req.body.moves ||
    !req.body.weaknesses ||
    !req.body.resistances
  ) {
    res.status(400).json({ message: "Incomplete pokemon." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("pokemon")
        .insertOne(newPokemon);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new pokemon.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create pokemon." });
    }
  }
};

const updatePokemon = async (req, res, next) => {
  const updatedPokemon = {
    name: req.body.name,
    type: req.body.type,
    hp: req.body.hp,
    weight: req.body.weight,
    height: req.body.height,
    moves: req.body.moves,
    weaknesses: req.body.weaknesses,
    resistances: req.body.resistances,
  };
  if (
    !req.body.name ||
    !req.body.type ||
    !req.body.hp ||
    !req.body.weight ||
    !req.body.height ||
    !req.body.moves ||
    !req.body.weaknesses ||
    !req.body.resistances
  ) {
    res.status(400).json({ message: "Incomplete pokemon." });
  } else {
    try {
      const pokemonId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("pokemon")
        .replaceOne({ _id: pokemonId }, updatedPokemon);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update pokemon." });
    }
  }
};

const deletePokemon = async (req, res, next) => {
  try {
    const pokemonId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("pokemon")
      .deleteOne({ _id: pokemonId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete pokemon." });
  }
};

module.exports = { getAll, getByName, createNew, updatePokemon, deletePokemon };
