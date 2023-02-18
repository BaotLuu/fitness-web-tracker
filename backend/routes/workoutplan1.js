const express = require("express");

const {
  getWorkoutPlan1,
  createWorkoutPlan1,
  deleteWorkoutPlan1,
} = require("../controllers/workoutplan1Controller");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET goal
router.get("/", getWorkoutPlan1);

//POST new goal
router.post("/", createWorkoutPlan1);

//delete
router.delete("/:id", deleteWorkoutPlan1);

module.exports = router;
