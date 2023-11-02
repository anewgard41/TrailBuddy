const router = require('express').Router();
const { Trails } = require('../models');
const { Op } = require('sequelize');

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/trails', async (req, res) => {
    try {
        // Render the trails.handlebars view
        res.render('layouts/trails');
    } catch (err) {
        res.status(500).json(err);
    }
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
