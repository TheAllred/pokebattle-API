const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("player").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all players." });
  }
};

const getById = async (req, res, next) => {
  const Id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("players")
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
  const newPlayer = {
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
    res.status(400).json({ message: "Incomplete player." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("player")
        .insertOne(newPlayer);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new player.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create player." });
    }
  }
};

const updatePlayer = async (req, res, next) => {
  const updatedPlayer = {
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
    res.status(400).json({ message: "Incomplete player." });
  } else {
    try {
      const playerId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("player")
        .replaceOne({ _id: playerId }, updatedPlayer);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update player." });
    }
  }
};

const deletePlayer = async (req, res, next) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("player")
      .deleteOne({ _id: playerId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete player." });
  }
};

module.exports = { getAll, getById, createNew, updatePlayer, deletePlayer };
