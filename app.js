const express = require("express");
const logger = require("morgan");
const jsonServer = require("json-server");
const url = require("url");
const env = process.env.NODE_ENV || "development";
const { flatten } = require("ramda");

const server = jsonServer.create();
const router =
  env === "test"
    ? jsonServer.router("db.test.json")
    : jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(logger("dev"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

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
    return false;
  }
}

const bookRouteNeedsAuth = (req) =>
  req.url.match(/books/) && (req.method === "DELETE" || req.method === "PUT");

const userRouteNeedsAuth = (req) =>
  req.url.match(/users/) && req.method === "DELETE";

server.use((req, res, next) => {
  if (
    (bookRouteNeedsAuth(req) || userRouteNeedsAuth(req)) &&
    !isAuthorized(req)
  ) {
    res.sendStatus(401);
  } else {
    next();
  }
});

server.use((req, res, next) => {
  if (req.method === "POST") {
    if ((req.path === "/books" || req.path === "/books/") && !req.body.title) {
      res.status(500).send({ error: "Title cannot be null" });
      return;
    }
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
    next();
  } else if (req.method === "PUT") {
    req.body.updatedAt = new Date().toISOString();
    req.method = "PATCH";
    next();
  } else {
    next();
  }
});

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
}

router.render = (req, res) => {
  if (req.method === "DELETE") {
    res.status(204);
  }

  if (req.method === "POST" && res.statusCode === 201) {
    res.locals.data.links = [
      {
        rel: "self",
        href: `${fullUrl(req)}/${res.locals.data.id}`,
      },
    ];
  }
  res.jsonp(res.locals.data);
};

server.post("/users", (req, res, next) => {
  const db = router.db;

  const collection = db.defaults({ wishlists: [] }).get("wishlists");

  const newWishlist = collection
    .insert({ name: `${req.body.firstName}'s List`, books: [] })
    .write();

  req.body.wishlistId = newWishlist.id;

  next();
});

server.post("/wishlists/:wishlistId/books/:bookId", (req, res) => {
  const db = router.db;

  const wishlist = db
    .defaults({ wishlists: [] })
    .get("wishlists")
    .find({ id: parseInt(req.params.wishlistId, 10) })
    .value();

  wishlist.books = wishlist.books || [];
  const bookId = parseInt(req.params.bookId, 10);

  const indexOf = wishlist.books.indexOf(bookId);

  if (indexOf < 0) {
    wishlist.books.push(bookId);
  }

  db.write();

  res.sendStatus(204);
});

const getBooksForWishlist = (wishlistId, db) => {
  const wishlist = db
    .defaults({ wishlists: [] })
    .get("wishlists")
    .find({ id: wishlistId })
    .cloneDeep()
    .value();

  const fullBooks = wishlist.books
    ? wishlist.books.map((b) =>
      db.get("books").find({ id: b }).cloneDeep().value()
    )
    : [];
  wishlist.books = fullBooks;

  return wishlist;
};

server.get("/wishlists/:wishlistId/books", (req, res) => {
  const wishlist = getBooksForWishlist(
    parseInt(req.params.wishlistId),
    router.db
  );
  res.status(200).jsonp(wishlist);
});

server.get("/households/:householdId/wishlistBooks", (req, res) => {
  const db = router.db;

  const users = db
    .get("users")
    .filter({ householdId: parseInt(req.params.householdId, 10) })
    .cloneDeep()
    .value();

  const wishlists = users.map((u) => getBooksForWishlist(u.wishlistId, db));

  const books = wishlists.map((w) => w.books.map((b) => b));

  res.status(200).jsonp(flatten(books));
});

server.get("/books/search", (req, res) => {
  const db = router.db;

  const books = db
    .get("books")
    .filter(
      (r) =>
        (req.query.title
          ? r.title.toLowerCase().includes(req.query.title.toLowerCase())
          : true) &&
        (req.query.author
          ? r.author.toLowerCase().includes(req.query.author.toLowerCase())
          : true)
    )
    .value();

  res.status(200).send(books);
});

server.use(router);

server.get("*", (req, res) => res.status(404).send());

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running: ${process.env.PORT || 3000}`);
});

module.exports = server;
