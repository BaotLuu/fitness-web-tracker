const WorkoutPlan2 = require("../models/workoutplan2Model");
const mongoose = require("mongoose");

//get all plan
const getWorkoutPlan2 = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await WorkoutPlan2.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//create new workout
const createWorkoutPlan2 = async (req, res) => {
  const { title, weight, reps, note, date } = req.body;
  //add to db
  try {
    const user_id = req.user._id;
    const workout = await WorkoutPlan2.create({
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
const deleteWorkoutPlan2 = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await WorkoutPlan2.findOneAndDelete({ _id: id });

  if (!workout) {
    retur;
  }

  res.status(200).json(workout);
};

//update workout
const updateWorkoutPlan2 = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await WorkoutPlan2.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!workout) {
    return res.status(400).json({ error: "Cannot find workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkoutPlan2,
  getWorkoutPlan2,
  deleteWorkoutPlan2,
  updateWorkoutPlan2,
};
