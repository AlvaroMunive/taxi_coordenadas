const { pool, Client } = require("pg");
const connectionString =
    "postgressql://Brayan:tiotaxi22@basededatostaxi.csgckedzjvw7.us-east-2.rds.amazonaws.com:5432/postgres";

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