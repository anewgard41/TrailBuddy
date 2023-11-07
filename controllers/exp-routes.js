const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const withAuth = require('../utilities/authenticate.js');

// Get all posts or experiences for the logged in user with associated comments. 
router.get('/', async (req, res) => {
    try {
        console.log(req.session.user_id);
        const postData = await Post.findAll({
            where : {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,   
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
            order: [['date_created', 'DESC']],
        }); 
        
        const posts = postData.map((post) => post.get({ plain: true }));

       console.log(posts);
        res.render("all-post", {layout : "experiences", posts});
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /new route for creating a new post or experience.
router.get('/new', async (req, res) => {
    try {
        res.render("new-post", { layout: "experiences" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET method for editing a single post or experience with its associated comments and users.
router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        
<<<<<<< HEAD
        const post = postData.get({ plain: true });
        res.render("editItem", { layout: "experiences", post });
=======
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('edit-posts', {
                layout: 'experiences',
                post,
            });
        } else {
            res.status(404).end();
        }
>>>>>>> 07313c2514164cd21bd52687172cfcac15a0073f
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
