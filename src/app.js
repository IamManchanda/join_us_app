const mysql = require("mysql");

const { 
  MYSQL_HOST: host, 
  MYSQL_USER: user, 
  MYSQL_DATABASE: database, 
  MYSQL_PASSWORD: password 
} = process.env;

console.log({ host, user, database, password });

const dbConnection = mysql.createConnection({ host, user, database, password });
const query = `
  SELECT 
    COUNT(*) AS total_count 
  FROM join_us_app.users;
`;
dbConnection.query(query, function executeQuery(error, results, fields) {
  if (error) throw error;
  const { total_count } = results[0];
  console.log({ total_count });
});

dbConnection.end();
