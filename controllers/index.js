const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const expRoutes = require('./exp-routes.js');
const hikingTipsRoutes = require('./hikingTips-routes.js');
const trailsRoutes = require('./trails-routes.js');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/experiences", expRoutes);
router.use("/hikingTips", hikingTipsRoutes);
router.use("/trails", trailsRoutes);

module.exports = router;



