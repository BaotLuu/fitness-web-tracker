const WorkoutPlan = require("../models/workoutplanModel");
const mongoose = require("mongoose");

//get all plan
const getWorkoutPlan = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await WorkoutPlan.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//create new workout
const createWorkoutPlan = async (req, res) => {
  const { title, weight, reps, note, date } = req.body;
  //add to db
  try {
    const user_id = req.user._id;
    const workout = await WorkoutPlan.create({
      title,
      weight,
      reps,
      note,
      date,
      user_id,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete workout
const deleteWorkoutPlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await WorkoutPlan.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "Cannot find workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkoutPlan,
  getWorkoutPlan,
  deleteWorkoutPlan,
};
