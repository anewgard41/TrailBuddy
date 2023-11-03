const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { Trails } = require('../models');
const { Op } = require('sequelize');

// Get posts for homepage, including the post creator's username and the comments associated with the post.
// router.get('/', async (req, res) => {
//     try {

//         const postData = await Post.findAll({  
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Comment,
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//             order: [['dateCreated', 'DESC']],  
//             }); 

//             const posts = postData.map((post) => post.get({ plain: true }));
       
//         res.render('homepage'
//             ,{ layout : main, 
//                 posts,
//                 loggedIn: req.session.loggedIn
//             });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// GET method used to retrieve homepage with the layout main.
router.get('/', async (req, res) => {
    try {
        res.render("homepage", { layout: "main" });
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


