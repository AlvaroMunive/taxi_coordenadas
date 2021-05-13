require('events').EventEmitter.prototype._maxListeners = 0;
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const { pool, Client } = require("pg");
//Credenciales de acceso
const connectionString =
    "";
const client = new Client({
    connectionString: connectionString,
});
//Generar conexion con  la base de datos
client.connect(function (err) {
    if (err) {
        console.log(err)
    }
});

var data

socket.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    socket.close();
});

//Obetener mensaje udp
socket.on('message', (msg, rinfo) => {
    //Arreglar formato del mensaje
    msg = msg.toString()
    console.log(msg)
    data = msg.split(",")

    if (data[4] == "1") {
        // Insertar dato entrante a la base de datos
        client.query('INSERT INTO public.taxi_coordenadas("Latitud", "Longitud", "Time", "Gasoline")VALUES (' + data[1] + ',' + data[0] + ',' + data[2] + ',' + data[3] + ');', (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    } else if (data[4] == "2") {
        // Insertar dato entrante a la base de datos
        client.query('INSERT INTO public.taxi_coordenadas2("Latitud", "Longitud", "Time", "Gasoline")VALUES (' + data[1] + ',' + data[0] + ',' + data[2] + ',' + data[3] + ');', (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }

});
//Escuchar puerto 3020
socket.bind(3020);
