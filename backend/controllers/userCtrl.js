const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");

// Register a new user
exports.signup = (req, res, next) => {
  if (emailValidator.validate(req.body.email)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          // Get the hashed password
          password: hash,
        }
        // Save this new user in database
        User.create(user)
          .then(() => res.status(201).json({ message: 'User created' }))
          .catch((error) => res.status(400).json({ error }))
      })
      .catch((error) => res.status(500).json({ error }))
  } else {
    res.status(400).json({ message: 'Merci de saisir un email valide' }) 
  }
}