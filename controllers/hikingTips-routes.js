const router = require('express').Router();
const { User, Post, Comment } = require("../models");

// GET method used to retrieve homepage with the layout hikingTips. 
router.get('/', async (req, res) => {
    try {
        res.render("homepage", { layout: "hikingTips" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;