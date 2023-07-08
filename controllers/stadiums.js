const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("stadium").find();
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
    description: req.body.description,
    fire: req.body.fire,
    water: req.body.water,
    electricity: req.body.electricity,
    grass: req.body.grass,
  };
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Incomplete stadium." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("stadium")
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
    description: req.body.description,
    fire: req.body.fire,
    water: req.body.water,
    electricity: req.body.electricity,
    grass: req.body.grass,
  };
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Incomplete stadium." });
  } else {
    try {
      const stadiumId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("stadium")
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
      .collection("stadium")
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
