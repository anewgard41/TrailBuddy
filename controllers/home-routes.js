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

// Define a route that handles GET requests for viewing a specific post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
      // Retrieve the post with the specified ID, including associated users and comments
      const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
        include: [
          User, // Include the associated user data
          {
            model: Comment, // Include comments associated with the post
            include: [User] // Include the associated user data for each comment
          }
        ],
        order: [
          ['date_created', 'DESC'] // Order the comments by date_created in descending order
        ]
      });
  
      if (!postData) {
        // Handle the case where the post with the specified ID is not found
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // If the post is found, you can render a template or send the data in a response
      // For example, you can send the postData as a JSON response
      res.json(postData);
    } catch (error) {
      // Handle any errors that may occur during the database query or processing
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
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