const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;




authRoutes.post("/signup", (req, res, next) => {

  console.log(req.body)

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Provide username, email and password"})
  }
  if (password.length < 7){
    return res.status(400).json({ message: "Please make your password at least 8 characters long for security purposes."})
    
  }
  
  User.findOne({$or: [{username}, {email}]}, (err, foundUser, foundEmail) => {
    if (err){
      return res.status(500).json({ message: "Username check went bad."})
    }
    if (foundUser) {
      return res.status(400).json({ message: "Username is already taken, choose another one."})
    }
    if (foundEmail) {
      return res.status(400).json({ message: "This email already exists"})
    }
    
  
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
          return res.status(400).json({ message: 'Saving user to database went wrong.' });
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(newUser, (err) => {

          if (err) {
              return res.status(500).json({ message: 'Login after signup went bad.' });
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          return res.status(200).json(newUser);
      });
    });
  });
});


authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }

      if (!theUser) {
          // "failureDetails" contains the error messages
          // from our logic in "LocalStrategy" { message: '...' }.
          res.status(401).json(failureDetails);
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }

          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});


authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});


module.exports = authRoutes;
