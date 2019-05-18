const mysql = require("mysql");
const express = require("express");

const app = express();
const { 
  MYSQL_HOST: host, 
  MYSQL_USER: user, 
  MYSQL_DATABASE: database, 
  MYSQL_PASSWORD: password 
} = process.env;
const dbConnection = mysql.createConnection({ host, user, database, password });

app.get("/", (request, response) => {
  const query = "SELECT COUNT(*) AS total_count FROM join_us_app.users;";
  dbConnection.query(query, function executeQuery(error, results, fields) {
    if (error) throw error;
    const { total_count } = results[0];
    response.send(`We have ${total_count} users`);
  });
});

app.listen(8080, () => {
  console.log("Server running on 8080");
});
