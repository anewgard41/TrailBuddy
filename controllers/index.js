const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const expRoutes = require('./exp-routes.js');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/experiences", expRoutes);

module.exports = router;



