const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    date: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    note: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkoutPlan", workoutSchema);
