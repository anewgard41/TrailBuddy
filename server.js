const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

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
