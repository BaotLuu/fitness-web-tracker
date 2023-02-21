const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sWeight: {
      type: String,
    },
    eWeight: {
      type: String,
    },
    sRep: {
      type: String,
    },
    eRep: {
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

module.exports = mongoose.model("Goal", goalSchema);
