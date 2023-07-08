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

const updatePlayer = async (req, res, next) => {
  const updatedPlayer = {
    name: req.body.name,
    picture: req.body.picture,
    email: req.body.email,
  };
  if (!req.body.name || !req.body.picture || !req.body.email) {
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

const buildProfile = async (req, res) => {
  let user = {};
  user = req.oidc.user;
  console.log(user);
  if (user.email) {
    console.log(user.email);
    const result = await mongodb
      .getDb()
      .db()
      .collection("player")
      .find({ email: user.email });
    // console.log(result);
    const lists = await result.toArray();
    console.log(lists);

    const profile = lists[0];
    if (profile) {
      res.send(JSON.stringify(profile));
    } else {
      try {
        const response = await mongodb
          .getDb()
          .db()
          .collection("player")
          .insertOne(req.oidc.user);
        if (response.acknowledged) {
          res.setHeader("Content-Type", "application/json");
          res.status(201).json(response);
        } else {
          res
            .status(500)
            .json(
              response.error || "Error occurred while creating new player."
            );
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create player." });
      }
    }
  } else {
    res.redirect("/");
  }
};

module.exports = {
  getAll,
  getById,
  updatePlayer,
  deletePlayer,
  buildProfile,
};
