const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("pokemon").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all pokemon." });
  }
};

const getById = async (req, res, next) => {
  const Id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("battles")
    .find({ _id: Id });

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
    number: req.body.number,
    type: req.body.type,
    abilities: req.body.abilities,
    stats: req.body.stats,
    evolutions: req.body.evolutions,
    moves: req.body.moves,
  };
  if (
    !req.body.name ||
    !req.body.number ||
    !req.body.type ||
    !req.body.abilities ||
    !req.body.stats ||
    !req.body.evolutions ||
    !req.body.moves
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
    number: req.body.number,
    type: req.body.type,
    abilities: req.body.abilities,
    stats: req.body.stats,
    evolutions: req.body.evolutions,
    moves: req.body.moves,
  };
  if (
    !req.body.name ||
    !req.body.number ||
    !req.body.type ||
    !req.body.abilities ||
    !req.body.stats ||
    !req.body.evolutions ||
    !req.body.moves
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

module.exports = { getAll, getById, createNew, updatePokemon, deletePokemon };
