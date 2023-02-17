const express = require("express");

const {
  getJournal,
  createJournal,
  deleteJournal,
  updateJournal,
} = require("../controllers/journalController");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET journal
router.get("/journal", getJournal);

//POST new journal
router.post("/journal", createJournal);

//delete
router.delete("/journal/:id", deleteJournal);

//update
router.patch("/journal/:id", updateJournal);

module.exports = router;
