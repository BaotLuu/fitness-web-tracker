const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET all workout
router.get("/workout", getWorkouts);

//GET single workout
router.get("/:id", getWorkout);

//POST new workout
router.post("/", createWorkout);

//DELETE workout
router.delete("/:id", deleteWorkout);

//UPDATE workout
router.put("/:id", updateWorkout);

module.exports = router;
