const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("SQL Connected");
});
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
      console.log(result);
      res.send("Request Failed");
    }
    res.send("Database created...");
  });
});
app.get("/newtable", (req, res) => {
  let sql =
    "CREATE TABLE tokens (username VARCHAR(255), tokenName VARCHAR(255), totalToken FLOAT(53), investementAmount FLOAT(53), pecuCoin FLOAT(53), tokenPrice FLOAT(53), status VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
    res.send("Table created");
  });
});

app.post("/create-tokens", (req, res) => {
  const {
    username,
    tokenName,
    totalToken,
    investementAmount,
    pecuCoin,
    tokenPrice,
    status,
  } = req.body;
  let sql = `INSERT INTO tokens (username, tokenName, totalToken, investementAmount, pecuCoin, tokenPrice, status) VALUES ("${username}", "${tokenName}", "${totalToken}", "${investementAmount}", "${pecuCoin}", "${tokenPrice}", "${status}")`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
app.get("/pending-token/:username", (req, res) => {
  username = req.params.username;
  let sql = `SELECT * FROM tokens WHERE username = "${username}" AND status = "Pending"`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/add-user/:name/:address", (req, res) => {
  let sql = `INSERT INTO users (name, address) VALUES ("${req.params.name}", "${req.params.address}")`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User added");
  });
});
// conn.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql =
//     "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
