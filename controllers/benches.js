const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("benches").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all benches." });
  }
};

const getById = async (req, res, next) => {
  const Id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("benches")
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

const getBenchByOwner = async (req, res, next) => {
  const email = req.params.email;
  console.log(email);
  const result = await mongodb
    .getDb()
    .db()
    .collection("benches")
    .find({ owner: email });

  const lists = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  if (lists[0]) {
    res.status(200).json(lists);
  } else {
    res.sendStatus(404);
  }
};

const createNew = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection("pokemon").find();
  const pokemon = await result.toArray();
  // {
  //   "pokemon1": "Pikachu",
  //   "pokemon2": "Zapdos",
  //   "pokemon3": "Charizard",
  //   "pokemon4": "Leafeon"
  // }

  const newBench = {
    owner: req.oidc.user.email,
    bench: [
      pokemon.find((pokemon) => pokemon.name === req.body.pokemon1),
      pokemon.find((pokemon) => pokemon.name === req.body.pokemon2),
      pokemon.find((pokemon) => pokemon.name === req.body.pokemon3),
      pokemon.find((pokemon) => pokemon.name === req.body.pokemon4),
    ],
  };
  console.log(newBench);
  if (
    !newBench.bench[0] ||
    !newBench.bench[1] ||
    !newBench.bench[2] ||
    !newBench.bench[3] ||
    !req.oidc.user.email
  ) {
    res.status(400).json({ message: "Incomplete benches." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("benches")
        .insertOne(newBench);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new benches.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create benches." });
    }
  }
};

const updateBench = async (req, res, next) => {
  const updatedBench = {
    owner: req.oidc.user.email,
    inPlay: req.body.inPlay,
    bench: {
      pokemon1: pokemon.find((pokemon) => pokemon.name === req.body.pokemon1),
      pokemon2: pokemon.find((pokemon) => pokemon.name === req.body.pokemon2),
      pokemon3: pokemon.find((pokemon) => pokemon.name === req.body.pokemon3),
      pokemon4: pokemon.find((pokemon) => pokemon.name === req.body.pokemon4),
    },
  };
  if (
    !newBench.bench.pokemon1 ||
    !newBench.bench.pokemon2 ||
    !newBench.bench.pokemon3 ||
    !newBench.bench.pokemon4 ||
    !req.oidc.user.email ||
    !req.oidc.user.inPlay
  ) {
    res.status(400).json({ message: "Incomplete bench." });
  } else {
    try {
      const BenchId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("benches")
        .replaceOne({ _id: BenchId }, updatedBench);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update benches." });
    }
  }
};

const deleteBench = async (req, res, next) => {
  try {
    const BenchId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("benches")
      .deleteOne({ _id: BenchId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete benches." });
  }
};

module.exports = {
  getAll,
  getById,
  createNew,
  updateBench,
  deleteBench,
  getBenchByOwner,
};
