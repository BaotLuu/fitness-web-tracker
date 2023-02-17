const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = new Schema(
    {
        title:{
            type:String,
        },
        notes: {
            type:String,
          },
        user_id:{
            type:String,
            required:true
          },
    },
    {timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);