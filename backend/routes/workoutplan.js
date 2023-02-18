const express = require("express");

const {
  getWorkoutPlan,
  createWorkoutPlan,
  deleteWorkoutPlan,
  updateWorkoutPlan,
} = require("../controllers/workoutplanController");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET goal
router.get("/", getWorkoutPlan);

//POST new goal
router.post("/", createWorkoutPlan);

//delete
router.delete("/:id", deleteWorkoutPlan);

//UPDATE workout
router.put("/:id", updateWorkoutPlan);

module.exports = router;
