const router = require("express").Router();
const { Router } = require("express");
const { User, Workout } = require("../../models");
const withAuth = require("../../utils/auth");

//find all workouts
router.get("/", (req, res) => {
  Workout.findAll()
    .then((dbWorkoutData) => res.json(dbWorkoutData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find one workouts
router.get("/:id", (req, res) => {
  Workout.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "exercise_type",
      "exercise_duration",
      "calories_burned",
      "calories_consumed",
      "current_weight",
      "user_id",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbWorkoutData) => {
      if (!dbWorkoutData) {
        res.status(404).json({ message: "No workout found with this id" });
        return;
      }
      res.json(dbWorkoutData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create workout
router.post("/", withAuth, (req, res) => {
  // expects {exersice_type = run, exercise_duration: 20, calories_burned=20, calories_consumed=20, current_weight=100}
  Workout.create({
    exercise_type: req.body.exercise_type,
    exercise_duration: req.body.exercise_duration,
    calories_burned: req.body.calories_burned,
    calories_consumed: req.body.calories_consumed,
    current_weight: req.body.current_weight,
    user_id: req.session.user_id,
    //user_id: req.body.user_id
  })
    .then((dbWorkoutData) => res.json(dbWorkoutData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update workout
router.put("/:id", withAuth, async (req, res) => {
    await Workout.update(
      {
        exercise_type: req.body.exercise_type,
        exercise_duration: req.body.exercise_duration,
        calories_burned: req.body.calories_burned,
        calories_consumed: req.body.calories_consumed,
        current_weight: req.body.current_weight
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbWorkoutData) => {
        if (!dbWorkoutData) {
          res.status(404).json({ message: "No Workout found" });
          return;
        }
        res.json(dbWorkoutData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  //delete workout
  router.delete("/:id", withAuth, (req, res) => {
    Workout.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbWorkoutData) => {
        if (!dbWorkoutData) {
          res.status(404).json({ message: "No workout found with this id" });
          return;
        }
        res.json(dbWorkoutData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;