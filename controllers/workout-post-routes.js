const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Workout } = require('../models');
const withAuth = require('../utils/auth');

//get workouts
router.get("/", withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', blog_post: 'Lorem Ipsum', user_id: 1}
    Workout.findAll({
        user_id: req.session.user_id,
        attributes: [
            'id',
            'exercise_type',
            'exercise_duration',
            'calories_burned',
            'calories_consumed',
            'current_weight',
            'created_at',
            "user_id"
        ],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((dbWorkoutData) => {
            const workouts = dbWorkoutData.map((workout) => workout.get({ plain: true }));
            res.render("workout", { workouts, loggedIn: true })
            console.log(workouts)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get one workout
router.get('/:id', withAuth, (req, res) => {
    Workout.findByPk(req.params.id, {
        attributes: [
            'id',
            'exercise_type',
            'exercise_duration',
            'calories_burned',
            'calories_consumed',
            'current_weight',
            'created_at',
        ]
    }).then(dbWorkoutData => {
        if (dbWorkoutData) {
            const workout = dbWorkoutData.get({ plain: true });

            res.render('edit-workouts', {
                workout,
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;