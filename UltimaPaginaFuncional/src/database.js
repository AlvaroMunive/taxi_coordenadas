const { pool, Client } = require("pg");
const connectionString =
  "postgressql://Alvaro:azereje12@serverbase.cigz349a2wix.us-east-2.rds.amazonaws.com:5432/serverbase0";

const client = new Client({
  connectionString: connectionString,
});
client.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log("DB connected")
  }

});
module.exports = client