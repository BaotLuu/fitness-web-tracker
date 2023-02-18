const WorkoutPlan1 = require("../models/workoutplan1Model");
const mongoose = require("mongoose");

//get all plan
const getWorkoutPlan1 = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await WorkoutPlan1.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//create new workout
const createWorkoutPlan1 = async (req, res) => {
  const { title, weight, reps, note, date } = req.body;
  //add to db
  try {
    const user_id = req.user._id;
    const workout = await WorkoutPlan1.create({
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
const deleteWorkoutPlan1 = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await WorkoutPlan1.findOneAndDelete({ _id: id });

  if (!workout) {
    retur;
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkoutPlan1,
  getWorkoutPlan1,
  deleteWorkoutPlan1,
};
