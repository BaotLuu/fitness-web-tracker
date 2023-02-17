const express = require("express");

const {
  getFGoal,
  createFGoal,
  deleteFGoal,
  updateFGoal,
} = require("../controllers/fgoalController");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET goal
router.get("/fitnessgoal", getFGoal);

//POST new goal
router.post("/fitnessgoal", createFGoal);

//delete
router.delete("/fitnessgoal/:id", deleteFGoal);

//update
router.patch("/fitnessgoal/:id", updateFGoal);

module.exports = router;
