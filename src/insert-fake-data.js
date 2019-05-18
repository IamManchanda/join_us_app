const mysql = require("mysql");
const faker = require("faker");

Number.prototype[Symbol.iterator] = function* () {
  for (let i = 1; i <= this; i += 1) yield i;
}; /* Make Numbers Iteratable */

const { 
  MYSQL_HOST: host, 
  MYSQL_USER: user, 
  MYSQL_DATABASE: database, 
  MYSQL_PASSWORD: password 
} = process.env;
const dbConnection = mysql.createConnection({ host, user, database, password });
const insertionQuery = "INSERT INTO users (email, created_at) VALUES ?";
const fakeData = [...500].map(() => [faker.internet.email(), faker.date.past()]);
dbConnection.query(insertionQuery, [fakeData], (error, response) => {
  if (error) throw error;
  console.log(response);
  console.log("Successfully Inserted data in insertion query");
});
dbConnection.end();
