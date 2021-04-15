const { pool, Client } = require("pg");
const connectionString =
    "";

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