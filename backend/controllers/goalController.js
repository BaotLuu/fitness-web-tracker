const Goal = require("../models/goalModel");
const mongoose = require("mongoose");

//get journal
const getGoal = async (req, res) => {
  const user_id = req.user._id;
  const goals = await Goal.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(goals);
};

//create journal
const createGoal = async (req, res) => {
  const { title, sWeight, eWeight, sRep, eRep, timeframe } = req.body;
  //add to db
  try {
    const user_id = req.user._id;
    const goals = await Goal.create({
      title,
      user_id,
      sWeight,
      eWeight,
      sRep,
      eRep,
      timeframe,
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete journal
const deleteGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Goal" });
  }

  const goals = await Goal.findOneAndDelete({ _id: id });

  if (!goals) {
    return res.status(400).json({ error: "Cannot find goal" });
  }

  res.status(200).json(goals);
};

//update
const updateGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such journal" });
  }

  const workout = await Goal.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(400).json({ error: "Cannot find journal" });
  }

  res.status(200).json(workout);
};

module.exports = { getGoal, createGoal, deleteGoal, updateGoal };
