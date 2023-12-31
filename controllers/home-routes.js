const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { Trails } = require('../models');
const { Op } = require('sequelize');
const withAuth = require('../utilities/authenticate.js');
const trailService = require('../utilities/trailService');
// Get posts for homepage, including the post creator's username and the comments associated with the post.
router.get('/', async (req, res) => {
    try {

        const postData = await Post.findAll({  
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
       
        res.render('homepage'
            ,{ layout : "main" , posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single post by id, including the post creator's username and the comments associated with the post.
router.get('/post/:id', withAuth, async (req, res) => {
    try {
      //const pageTitle = 'Posts';
      const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
        order: [
          ['date_created', 'DESC'],
        ]
      });
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('single-post', {
          post,
          logged_in: req.session.logged_in
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET login route- renders the login page. 
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/experiences'); 
        return;
    }
    
    res.render('login');
});

// GET signup route- renders the signup page. If already logged in, redirects to homepage.
router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/experiences');
        return;
    }
    
    res.render('signup');
});


router.get('/api/searchTrails', async (req, res) => {
  try {
      const searchTerm = req.query.q;
      console.log(`Searching trails with term: ${searchTerm}`);
      const trails = await trailService.searchTrails(searchTerm);
      console.log(`Found trails:`, trails);
      res.json(trails);
  } catch (error) {
      console.error("Error in /api/searchTrails:", error);
      res.status(500).send('An internal server error occurred');
  }
});


module.exports = router;

