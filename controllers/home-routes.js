const router = require('express').Router();
const { Blog, User, Workout } = require('../models');

//homepage
router.get('/',(req,res) => {
        res.render('homepage')
} );

//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//logout
router.get('/logout', (req, res) => {
    res.render('homepage');
});

//sign-up
router.get('/sign-up', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('sign-up');
});

// get single blog
router.get('/blogs/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: Math.floor(Math.random()*5 + 1)
        },
        attributes: [
            'id',
            'blog_post',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found' });
                return;
            }

            const blog = dbBlogData.get({ plain: true });

            res.render('single-blog', {
                blog,
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/workout-tracker-info', (req, res) => {
    res.render('workout-tracker-info');
});


module.exports = router;
