const router = require('express').Router();
const { User } = require('../../models');

//This is where session ID stuff is handled. 

// Post route responsible for creating new user. The user_id is taken from the session and the loggedIn property is set to true.
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username; 
            req.session.loggedIn = true;
            
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

// Post route responsible for logging in a user. 
router.post('/login', async (req, res) => {
    try {
        // Find the user who matches the posted username.
        const userData = await User.findOne({ where: { username: req.body.username } });
        // If no user with that username is found, return an error.
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again.' });
            return;
        }
        // If there is a matching username address, use the checkPassword method from the User model to verify the user's identity.
        const validPassword = await userData.checkPassword(req.body.password);
        // If the password is invalid, return an error.
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again.' });
            return;
        }
        // If the password is valid, save the session, and set the loggedIn property to true. Then send a response with the user's information.
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            console.log(req.session.loggedIn);    
            res.json({ user: userData, message: 'You are now logged in!' });
            
        });

       
    } catch (err) {
        res.status(400).json(err);
    }
});

// Post route responsible for logging out a user.
router.post('/logout', (req, res) => {
    // When the user logs out, the session is destroyed and the loggedIn property is set to false. Then the user is sent to the homepage.
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router; 

