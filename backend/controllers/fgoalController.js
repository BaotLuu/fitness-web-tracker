const FGoal = require("../models/fgoalModel");
const mongoose = require("mongoose");

//get journal
const getFGoal = async (req, res) => {
  const user_id = req.user._id;
  const goals = await FGoal.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(goals);
};

//create journal
const createFGoal = async (req, res) => {
  const { title, sTime, eTime, timeframe, sDistance, eDistance } = req.body;
  //add to db
  try {
    const user_id = req.user._id;
    const goals = await FGoal.create({
      title,
      user_id,
      sDistance,
      eDistance,
      sTime,
      eTime,
      timeframe,
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete journal
const deleteFGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Goal" });
  }

  const goals = await FGoal.findOneAndDelete({ _id: id });

  if (!goals) {
    return res.status(400).json({ error: "Cannot find goal" });
  }

  res.status(200).json(goals);
};

//update
const updateFGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such journal" });
  }

  const workout = await FGoal.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(400).json({ error: "Cannot find journal" });
  }

  res.status(200).json(workout);
};

module.exports = { getFGoal, createFGoal, deleteFGoal, updateFGoal };
