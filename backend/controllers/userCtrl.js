const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");

// Register a new user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // On hache le mot de passe 10 fois
    .then((hash) => {
      // On crée un nouvel utilisateur en utilisant notre schéma mongoose
      const user = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        // On récupère le mot de passe haché
        password: hash,
      };
      // On sauvegarde ce nouvel utilisateur en bdd
      User
        .create(user)
        .then(() => res.status(201).json({ message: 'User created' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}