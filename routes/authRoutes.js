module.exports = (router, passport, validate) => {
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
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  });

  router.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.route("/register").post((req, res, next) => {
    const first_name = req.body.first_name ? req.body.first_name.trim() : "";
    const last_name = req.body.last_name ? req.body.last_name.trim() : "";
    const email = req.body.email ? req.body.email.trim() : "";
    const password = req.body.password ? req.body.password.trim() : "";
    const gender = req.body.gender ? req.body.gender : "";
    const dob = req.body.dob ? req.body.dob : "";
    const height_in = req.body.height_in ? req.body.height_in: "";

    if (!email || !password || !first_name || !last_name || !gender || !dob) {
      return res.status(422).send({ error: "All fields are required." });
    }

    if (!validate.name(first_name)) {
      return res.status(422).send({
        error: "Invalid first name."
      });
    }

    if (!validate.name(last_name)) {
      return res.status(422).send({
        error: "Invalid last name."
      });
    }

    if (!validate.email(email)) {
      return res.status(422).send({
        error: "Invalid email format."
      });
    }

    if (!validate.password(password)) {
      return res.status(422).send({
        error:
          "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
      });
    }

    if (gender !== "M" && gender !== "F") {
      return res.status(422).send({
        error: "Invalid gender value."
      });
    }

    if (!validate.dob(dob)) {
      return res.status(422).send({
        error: "Date of birth must be in the past."
      });
    }

    if (!(height_in>0)) {
      return res.status(422).send({
        error: "Height must be a positive number."
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
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  });
};
