require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const journalRoutes = require("./routes/journal");
const goalRoutes = require("./routes/goals");
const fgoalRoutes = require("./routes/fgoals");
const workoutplanRoutes = require("./routes/workoutplan");
const workoutplanRoutes1 = require("./routes/workoutplan1");

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/lgoal", goalRoutes);
app.use("/api/fgoal", fgoalRoutes);
app.use("/api/workoutplan", workoutplanRoutes);
app.use("/api/workoutplan1", workoutplanRoutes1);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen to request
    app.listen(process.env.PORT, () => {
      console.log("listening ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
