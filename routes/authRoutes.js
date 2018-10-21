module.exports = (router, passport) => {
  router.route("/login").post((req, res, next) => {
    passport.authenticate("local-login", function(err, user, info) {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!user) {
        return res.status(422).send({ error: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(400).send({ error: err });
        }
        return res.redirect("/profile");
      });
    })(req, res, next);
  });

  router.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.route("/register").post((req, res, next) => {
    const email = req.body.email ? req.body.email.trim() : "";
    const password = req.body.password ? req.body.password.trim() : "";

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "Email and password are required." });
    }

    function validateEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }

    function validatePassword(password) {
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      return regex.test(password);
    }

    if (!validateEmail(email)) {
      return res.status(422).send({
        error: "Invalid email format."
      });
    }

    if (!validatePassword(password)) {
      return res.status(422).send({
        error:
          "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
      });
    }

    passport.authenticate("local-register", function(err, user, info) {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!user) {
        return res.status(422).send({ error: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(400).send({ error: err });
        }
        return res.redirect("/profile");
      });
    })(req, res, next);
  });
};
