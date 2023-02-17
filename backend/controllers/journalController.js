const Journal = require("../models/journalModel");
const mongoose = require("mongoose");

//get journal
const getJournal = async (req, res) => {
  const user_id = req.user._id;
  const journals = await Journal.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(journals);
};

//create journal
const createJournal = async (req, res) => {
  const { title, notes } = req.body;
  //add to db
  try {
    const user_id = req.user._id;
    const journals = await Journal.create({ title, notes, user_id });
    res.status(200).json(journals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete journal
const deleteJournal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Journal" });
  }

  const journal = await Journal.findOneAndDelete({ _id: id });

  if (!journal) {
    return res.status(400).json({ error: "Cannot find journal" });
  }

  res.status(200).json(journal);
};

const updateJournal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such journal" });
  }

  const workout = await Journal.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(400).json({ error: "Cannot find journal" });
  }

  res.status(200).json(workout);
};

module.exports = { getJournal, createJournal, deleteJournal, updateJournal };
