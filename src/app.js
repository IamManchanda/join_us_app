const mysql = require("mysql");
const express = require("express");
const path = require('path');
const bodyParser  = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
const { 
  MYSQL_HOST: host, 
  MYSQL_USER: user, 
  MYSQL_DATABASE: database, 
  MYSQL_PASSWORD: password 
} = process.env;
const dbConnection = mysql.createConnection({ host, user, database, password });

app.get("/", (request, response) => {
  const selectQuery = "SELECT COUNT(*) AS total_count FROM join_us_app.users;";
  dbConnection.query(selectQuery, function executeQuery(error, results, fields) {
    if (error) throw error;
    const { total_count } = results[0];
    response.render("home", { total_count });
  });
});

app.post("/register", (request, response) => {
  const person = { email: request.body.email };
  const insertQuery = "INSERT INTO users SET ?";
  dbConnection.query(insertQuery, person, function(error, result) {
      if (error) throw error;
      response.redirect("/");
  });
});

app.listen(8080, () => {
  console.log("Server running on 8080");
});
