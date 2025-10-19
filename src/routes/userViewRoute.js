module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("login", { title: "login" });
  });

  app.get("/login", (req, res) => {
    res.render("login", { title: "login" });
  });

  app.get("/register", (req, res) => {
    res.render("register", { title: "register" });
  });

  app.get("/dashboard", (req, res) => {
    res.render("dashboard", { title: "dashboard" });
  });
};
