const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//find all blogs
router.get("/", withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', blog_post: 'Lorem Ipsum', user_id: 1}
    Blog.findAll({
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "blog_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((dbBlogData) => {
            const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
            res.render("view-blogs", { blogs, loggedIn: true})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get one blog with all comments
router.get('/:id', withAuth, (req, res) => {
    Blog.findAll({
        where: { id: req.params.id },
        attributes: [
            'id',
            'title',
            'blog_post',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_text'],
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
            if (dbBlogData) {
                const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
                res.render('view-full-blog', {blogs, loggedIn:true             
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
