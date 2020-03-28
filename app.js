const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const env = process.env.NODE_ENV || "development";

const server = jsonServer.create();
const router = env === "test" ? jsonServer.router("db.test.json") : jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(logger("dev"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

require("./server/routes/")(server, express);

function isAuthorized(req) {
  if (req.headers.authorization) {
    const user_and_password = new Buffer.from(
      req.headers.authorization.split(" ")[1],
      "base64"
    ).toString();

    const user = user_and_password.split(":")[0];
    const pw = user_and_password.split(":")[1];

    return (
      user === "admin" &&
      ((env === "test" && pw === "admin_test") || pw === "admin")
    );
  } else {
    return true;
  }
}

const bookRouteNeedsAuth = req =>
  req.url.match(/books/) && (req.method === "DELETE" || req.method === "PUT");

const userRouteNeedsAuth = req =>
  req.url.match(/users/) && req.method === "DELETE";

server.use((req, res, next) => {
  if ((bookRouteNeedsAuth || userRouteNeedsAuth) && !isAuthorized(req)) {
    res.sendStatus(401);
  } else {
    next();
  }
});

server.use(router);

server.get("*", (req, res) => res.status(404).send());

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running: ${process.env.PORT || 3000}`);
});

module.exports = server;
