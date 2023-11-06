const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { Trails } = require('../models');
const { Op } = require('sequelize');
const withAuth = require('../utilities/authenticate.js');

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
            ,{ layout : "main" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET method used to retrieve homepage with the layout main.
// router.get('/', async (req, res) => {
//     try {
//         res.render("homepage", { layout: "main" });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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
        const trails = await Trails.findAll({
            where: {
                trail_name: {
                    [Op.like]: `%${searchTerm}%`  // This will search for trails that have names like the search term
                }
            }
        });
        res.json(trails);
    } catch (error) {
        console.error("Error in /api/searchTrails:", error);  // Add this line
        res.status(500).json(error);
    }
});

module.exports = router;