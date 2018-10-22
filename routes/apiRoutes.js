module.exports = (router, db) => {
  const sequelize = db.sequelize;
  const User = db.User;
  const Log = db.Log;

  router
    .route("/profile")
    .all(require("connect-ensure-login").ensureLoggedIn("/login"))
    .get((req, res, next) => {
      // * find user and all associated log entries
      User.findById(req.user.id, {
        include: {
          model: Log,
          attributes: {
            include: [
              // * convert created_at to date only
              [
                sequelize.fn(
                  "date_format",
                  sequelize.col("Logs.created_at"),
                  "%Y-%m-%d"
                ),
                "entry_date"
              ]
            ]
          }
        }
      }).then(user => {
        // * use toJSON() to convert to raw format while preserving logs
        res.render("profile", { user: user.toJSON() });
      });
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
      Log.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
      });
    });
};
