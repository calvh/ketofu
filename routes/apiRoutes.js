module.exports = (router, db, ensureLoggedIn, calculateMacros) => {
  const sequelize = db.sequelize;
  const User = db.User;
  const Log = db.Log;

  router
    .route("/api/users")
    .all(require("connect-ensure-login").ensureLoggedIn("/login"))
    .get((req, res, next) => {
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
        res.json(user);
      });
    })
    .post((req, res, next) => {
      next();
    })
    .put((req, res, next) => {
      next();
    })
    .delete((req, res, next) => {
      next();
    });

  router
    .route("/api/logs")
    .all(require("connect-ensure-login").ensureLoggedIn("/login"))
    .get((req, res, next) => {
      next();
    })
    .post((req, res, next) => {
      // * add user_id to the data object to be submitted
      const data = { ...req.body, user_id: req.user.id };
      Log.create(data)
        .then(log => {
          res.json(log.dataValues);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    })
    .put((req, res, next) => {
      next();
    })
    .delete((req, res, next) => {
      next();
    });
};
