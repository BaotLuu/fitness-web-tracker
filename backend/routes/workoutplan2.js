const express = require("express");

const {
  getWorkoutPlan2,
  createWorkoutPlan2,
  deleteWorkoutPlan2,
  updateWorkoutPlan2,
} = require("../controllers/workoutplan2Controller");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET goal
router.get("/", getWorkoutPlan2);

//POST new goal
router.post("/", createWorkoutPlan2);

//delete
router.delete("/:id", deleteWorkoutPlan2);

////UPDATE workout
router.put("/:id", updateWorkoutPlan2);

module.exports = router;
