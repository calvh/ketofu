const db = require("../models");
const User = db.User;
const Logs = db.Logs;

module.exports = router => {
  router
    .route("/profile")
    .all(require("connect-ensure-login").ensureLoggedIn("/login"))
    .get((req, res, next) => {
      User.findById(req.user.id)
        .then(user => {
          // TODO: calculate macros here maybe?
          res.render("profile", { user: req.user, logs: user.logs });
        })
        .catch(err => {
          res.status(500).end();
        });
    })
    .post((req, res, next) => {
      User.findById(req.user.id)
        .then(user => {
          return user.addLog(req.body);
        })
        .then(log => {
          res.json(log);
        })
        .catch(err => {
          res.status(500).end();
        });
    })
    .put((req, res, next) => {next()})
    .delete((req, res, next) => {
      Log.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
      });
    });
};
