const express = require("express");

const {
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalController");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();
router.use(verifyAuth);

//GET goal
router.get("/liftinggoal", getGoal);

//POST new goal
router.post("/liftinggoal", createGoal);

//delete
router.delete("/liftinggoal/:id", deleteGoal);

//update
router.patch("/liftinggoal/:id", updateGoal);

module.exports = router;
