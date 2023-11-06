const router = require('express').Router();
const { Trails } = require('../models');
const withAuth = require('../utilities/authenticate.js');

// GET method retrieves all trails from the database. Renders the homepage with the trails layout.
router.get('/', withAuth, async (req, res) => {
    try {
        const trailsData = await Trails.findAll();
        const trails = trailsData.map((trail) => trail.get({ plain: true }));
        res.render("homepage", { layout: "trails", trails });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET method retrieves a single trail by its id. Renders the homepage with the trails layout.
router.get('/:id', withAuth, async (req, res) => {
    try {
        const trailsData = await Trails.findByPk(req.params.id);
        const trails = trailsData.get({ plain: true });
        res.render("homepage", { layout: "trails", trails });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

