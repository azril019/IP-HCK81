const express = require("express");
const app = express();
const port = 3000;
const UserController = require("./Controllers/UserController");
const Controller = require("./Controllers/controller");
const authentication = require("./middlewares/authentication");
// const authorization = require("./middlewares/authorization");
const errorHandlers = require("./Controllers/errorHandlers");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", UserController.register);
app.post("/login", UserController.login);
app.use(authentication);
app.get("/profile", Controller.getProfile);
app.put("/profile", Controller.editProfile);
app.delete("/profile", Controller.deleteProfile);
app.post("/preference", Controller.addPreference);
app.put("/preference/:id", Controller.editPreference);
app.get("/preference", Controller.getPreference);
app.delete("/preference/:id", Controller.deletePreference);
app.get("/recommendations", Controller.getRecommendationFromAi);
app.get("/external-data/:id", Controller.getExternalData);

app.use(errorHandlers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
