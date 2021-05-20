const { pool, Client } = require("pg");
const connectionString =
    "postgressql://AlvaroM:azereje12@basededatos.ci7ji3srm4eo.us-east-1.rds.amazonaws.com:5432/database1";

const client = new Client({
    connectionString: connectionString,
});
//Generar conexion con la base de datos
client.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("DB connected")
    }

});
//Exportar el objeto client
module.exports = client