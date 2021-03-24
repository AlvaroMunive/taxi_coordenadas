require('events').EventEmitter.prototype._maxListeners = 0;
var express = require('express');
const dgram = require('dgram');
var mysql = require('mysql');
var path = require('path');
const fs = require("fs")
var app = express();
var server = require('http').Server(app);
const socket = dgram.createSocket('udp4');
app.use(express.static(__dirname));
// Module postgresql
const {pool,Client}= require("pg")
// Parametros para para la conexion con postgresql
const connectionString="postgressql://Alvaro:azereje12@serverbase.cigz349a2wix.us-east-2.rds.amazonaws.com:5432/serverbase0"
// Entanblar conexion con postgresql
const client = new Client({
  connectionString:connectionString
})

client.connect()


var data
var longitud
var time
var latitud



socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  socket.close();
});


socket.on('message', (msg, rinfo) => {

    msg=msg.toString()
    msg = msg.split('INSERT INTO `taxis1_coordenadas` (`Longitud`, `Latitud`, `Tiempo`) VALUES (').join('')
    msg = msg.split(');').join('')
    data=msg.split(",")
    longitud=data[0];

    latitud= data[1];

    time=data[2]

// Insertar dato entrante a la base de datos
    client.query('INSERT INTO public.taxi_coordenadas("Latitud", "Longitud", "Time")VALUES ('+latitud+','+longitud+','+time+');', (err,res)=>{
    console.log(err,res);

    })





});

setInterval(function(){
//Escribir txt con ultima data de la base de datos.
    data=JSON.stringify(data);
    data=('{\"lat\":'+latitud+',\"lon\":'+longitud+',\"tim\":'+time+'}')
    data=data.split("'").join('"')


   fs.writeFile("lastData.txt",data,function (err) {
     if (err) throw err;
 });
},1000);


app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});


socket.bind(3020);
server.listen(80, () => {
  console.log('Servidor abierto en puerto 80');
});
