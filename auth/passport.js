const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;

// * for password encryption
const bcrypt = require("bcrypt");

// ------------------------------  REGISTER  ------------------------------
passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ where: { email }, raw: true })
        .then(user => {
          if (user) {
            // * email already exists
            return done(null, false, {
              message: "This email is already registered."
            });
          }
          //   * encrypt password
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt);

          const userObj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            dob: req.body.dob,
            height_in: req.body.height_in,
            email,
            password: hash
          };

          User.create(userObj)
            .then(newUser => {
              const dataObj = newUser.get({ plain: true });
              return done(null, dataObj, {
                message: "User created successfully."
              });
            })
            .catch(err => {
              return done(err);
            });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

// --------------------------------  LOGIN  -------------------------------
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ where: { email }, raw: true })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password."
            });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {
              message: "Incorrect email or password."
            });
          }

          return done(null, user, { message: "Login successful." });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

module.exports = passport;
