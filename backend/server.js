const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 8888;
const app = express();
const endPointRoot = "/comp4537/assignments/1/quotesapp";

console.log("database setup");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "christin_quotes",
  password: "pineapplebubbletea",
  database: "christin_quotes",
});

// GET request
// get ALL quotes in the database
app.get(endPointRoot + "/quotes", (req, res) => {
  let sql = "SELECT * FROM quote ORDER BY quoteId ASC;";
  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// GET request
// get a SPECIFIC quote in the database
app.get(endPointRoot + "/quotes/:quoteId", (req, res) => {
  let quoteId = req.params.quoteId;
  let sql = "SELECT * FROM quote WHERE quoteId = " + quoteId + ";";

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
});

// POST request
// add a new quote into the database
app.post(endPointRoot + "/quotes", (req, res) => {
  console.log("posting ping");
  let text = req.body.text;
  let author = req.body.author;
  let sql =
    "INSERT INTO quote (text, author) VALUES ('" +
    text +
    "', '" +
    author +
    "');";

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// PUT request
// update existing quote in the database
app.put(endPointRoot + "/quotes", (req, res) => {
  let quoteId = req.body.quoteId;
  let text = req.body.text;
  let author = req.body.author;
  let sql =
    "UPDATE quote SET text = '" +
    text +
    "', author = '" +
    author +
    "' WHERE quoteId = " +
    quoteId +
    ";";

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
});

// DELETE request
// deletes a quote from the database
app.delete("*", (req, res) => {
  let quoteId = req.body.quoteId;
  let sql = "DELETE FROM quote WHERE quoteId = " + quoteId + ";";

  connection.query(sql, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log("Listening on port: ${PORT}");
});
