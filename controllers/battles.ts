import { Request, Response, NextFunction } from "express";
import mongodb from "../db/connect";
import { ObjectId } from "mongodb";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mongodb.getDb().db().collection("battle").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all battle." });
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const Id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("battle")
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

const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const newBattle = {
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
    res.status(400).json({ message: "Incomplete battle." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("battle")
        .insertOne(newBattle);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new battle.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create battle." });
    }
  }
};

const startNewBattle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const player1_bench_ID = new ObjectId(req.body.P1BenchID);
  const player2_bench_ID = new ObjectId(req.body.P2BenchID);
  const player1_bench_raw = await mongodb
    .getDb()
    .db()
    .collection("benches")
    .find({ _id: player1_bench_ID });
  console.log(player1_bench_ID);
  console.log(player2_bench_ID);
  const player1_bench = await player1_bench_raw.toArray();
  const player2_bench_raw = await mongodb
    .getDb()
    .db()
    .collection("benches")
    .find({ _id: player2_bench_ID });
  const player2_bench = await player2_bench_raw.toArray();
  let stadiumId = new ObjectId(req.body.stadium);

  const stadium = await mongodb
    .getDb()
    .db()
    .collection("stadium")
    .find({ _id: stadiumId });
  const newBattle = {
    player1: req.oidc.user.email,
    player2: req.body.opponent,
    player1_bench: player1_bench[0],
    player2_bench: player2_bench[0],
    turn: req.body.opponent,
    stadium: stadium,
  };
  if (
    !req.oidc.user.email ||
    !req.body.opponent ||
    !player1_bench[0] ||
    !player2_bench[0] ||
    !req.body.opponent ||
    !stadium
  ) {
    res.status(400).json({ message: "Incomplete battle." });
  } else {
    try {
      const response = await mongodb
        .getDb()
        .db()
        .collection("battle")
        .insertOne(newBattle);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(response.error || "Error occurred while creating new battle.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create battle." });
    }
  }
};

const listTurn = async (req: Request, res: Response) => {
  const battleID = new ObjectId(req.params.battleID);
  const DBresult = await mongodb
    .getDb()
    .db()
    .collection("battle")
    .find({ _id: battleID });
  const DBList = await DBresult.toArray();
  let battle = DBList[0];
  console.log(battle.turn);
  console.log(req.oidc.user.email);
  if (battle.turn != req.oidc.user.email) {
    res.status(500).json({ message: "Its not your turn!" });
  } else {
    let myBench = {};
    console.log(battle.player1_bench.owner);
    console.log(battle.player2_bench.owner);
    if (battle.player1_bench.owner === req.oidc.user.email) {
      myBench = battle.player1_bench;
    } else if (battle.player2_bench.owner === req.oidc.user.email) {
      myBench = battle.player2_bench;
    }
    console.log(myBench);
    if (myBench) {
      let moves = {
        Run: "Run",
        SwitchStadium: "Swap Stadium",
        // Attack: myBench.bench[0].moves,
      };
      res.status(200).json(moves);
    } else {
      res.status(500).json({ error: "something went wrong!" });
    }
  }
};

const executeTurn = async (req: Request, res: Response) => {
  const battleID = new ObjectId(req.params.battleID);
};

const updateBattle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updatedBattle = {
    player1: req.body.me,
    player2: req.body.opponent,
    player1_bench: player1_bench[0],
    player2_bench: player2_bench[0],
    turn: req.body.opponent,
    stadium: stadium,
  };
  if (
    !req.body.me ||
    !req.body.opponent ||
    !player1_bench[0] ||
    !player2_bench[0] ||
    !req.body.opponent ||
    !stadium
  ) {
    res.status(400).json({ message: "Incomplete battle." });
  } else {
    try {
      const battleId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db()
        .collection("battle")
        .replaceOne({ _id: battleId }, updatedBattle);
      if (response.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(204).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update battle." });
    }
  }
};

const deleteBattle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const battleId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("battle")
      .deleteOne({ _id: battleId });
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete battle." });
  }
};

module.exports = {
  getAll,
  getById,
  createNew,
  updateBattle,
  deleteBattle,
  startNewBattle,
  listTurn,
  executeTurn,
};
