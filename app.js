const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'your_secret_key', // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true } // Set secure to true if you're using HTTPS, false for HTTP
}));

// Routes
app.get('/en', (req, res) => {
    res.render('en_first');
});

// Route for creating a new wallet
app.get('/create-wallet', (req, res) => {
    res.render('create_wallet');
});

// Routes
app.get('/add-wallet', (req, res) => {
    res.render('add_wallet', { error: null });
  });
  
app.post('/add-wallet', (req, res) => {
const walletData = req.body.walletData;
// Validate walletData here. For example, check if it's correct.
if (walletData === "1") { // Replace with your validation logic
    // If validation passes, save user info in session
    req.session.user = { walletData: walletData };
    res.redirect('/home'); // Redirect to the home page
} else {
    // If validation fails, render the add_wallet page with an error
    res.render('add_wallet', { error: "Incorrect information provided. Please try again." });
}
});

app.get('/home', (req, res) => {
    if (req.session.user) {
      // The user is logged in, render the home page
      res.render('home');
    } else {
      // The user is not logged in, redirect to the add-wallet page
      res.redirect('/en');
    }
  });
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
