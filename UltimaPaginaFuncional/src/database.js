const { pool, Client } = require("pg");
const connectionString =
    "";

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