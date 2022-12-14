const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const workoutPostRoutes = require('./workout-post-routes.js');
const blogPostRoutes = require('./blog-post-routes.js');
const commentPostRoutes = require('./comment-post-routes.js');
const viewBlogs = require('./view-blogs-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/edit-workouts', workoutPostRoutes);
router.use('/edit-blogs', blogPostRoutes);
router.use('/comment-blogs', commentPostRoutes);
router.use('/view-blogs', viewBlogs);

module.exports = router;
