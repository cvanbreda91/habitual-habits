const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all comments
router.get("/", (req, res) => {
    Comment.findAll({
        where: {
        blog_id:req.params.id},
        attributes: ["id", "comment_text", "blog_id", "user_id", "createdAt"],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
        ],
        include: [
            {
                model: Blog,
                attributes: ["blog_id"],
            },
        ],
    })
        .then((dbCommentData) => {
            const comments = dbCommentData.map((comment) => comment.get({ plain: true }));
            res.render("edit-blog", { comments })
            console.log("comments are" , comments)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;