const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3001;

// Middleware for serving static files from 'public' directory
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const homeRoutes = require('./controllers/home-routes.js');
app.use('/', homeRoutes);

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const path = require ('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// process.env.PORT lets the port be set by Heroku, or 3001 for local development. 


const sess = {
    secret: "do NOT tell anybody or ELSE I will CRY!",
    cookie: {
        // maxAge controls how long the session will stay active in milliseconds
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    // SequelizeStore will automatically create the sessions table in the database
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// set up handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set ('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// turn on connection to db and server
// force: true will drop and re-create all database tables on startup
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
});

