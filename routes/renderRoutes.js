module.exports = (router, db, ensureLoggedIn, calculateMacros) => {
  const sequelize = db.sequelize;
  const User = db.User;
  const Log = db.Log;
  // Load index page
  router.get("/", (req, res) => {
    res.render("index", {});
  });

  router.get("/login", (req, res) => {
    res.render("login", {});
  });

  router.get("/register", (req, res) => {
    res.render("register", {});
  });

  router.get("/dashboard", ensureLoggedIn("/login"), (req, res) => {
    // * find user and all associated log entries
    User.findById(req.user.id, {
      include: { model: Log }
    }).then(dbUser => {
      // * use toJSON() to convert to raw format while preserving logs
      const user = dbUser.toJSON();
      user.age = new Date().getFullYear() - new Date(user.dob).getFullYear();
      user.Logs.forEach(log => {
        const macros = calculateMacros(
          user.age,
          user.gender,
          user.height_in,
          log.weight_lb,
          log.act_lvl,
          log.fat_pct,
          log.cal_deficit,
          log.net_carbs
        );
        log.net_protein = macros.protein.toFixed(1);
        log.net_fat = macros.fat.toFixed(1);
      });
      res.render("dashboard", { style: "dashboard.css", user });
    });
  });

  // Render 404 page for any unmatched routes
  router.get("*", (req, res) => {
    res.status(404).render("404");
  });
};
