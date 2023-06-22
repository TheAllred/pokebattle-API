const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("stadiums").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all stadiums." });
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
  const newStadium = {
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
    res.status(400).json({ message: "Incomplete stadium." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("stadiums")
        .insertOne(newStadium);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new stadium.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create stadium." });
    }
  }
};

const updateStadium = async (req, res, next) => {
  const updatedStadium = {
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
    res.status(400).json({ message: "Incomplete stadium." });
  } else {
    try {
      const stadiumId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("stadiums")
        .replaceOne({ _id: stadiumId }, updatedStadium);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update stadium." });
    }
  }
};

const deleteStadium = async (req, res, next) => {
  try {
    const stadiumId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("stadiums")
      .deleteOne({ _id: stadiumId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete stadium." });
  }
};

module.exports = { getAll, getById, createNew, updateStadium, deleteStadium };
