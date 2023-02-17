const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fgoalSchema = new Schema(
  {
    title: {
      type: String,
    },
    sTime: {
      type: String,
    },
    eTime: {
      type: String,
    },
    sDistance: {
      type: String,
    },
    eDistance: {
      type: String,
    },
    timeframe: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FGoal", fgoalSchema);
