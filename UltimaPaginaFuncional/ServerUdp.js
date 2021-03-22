var socketio = require('socket.io');
var express = require('express');
const dgram = require('dgram');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
const fs = require("fs")
var app = express();
var server = require('http').Server(app);
const socket = dgram.createSocket('udp4');
app.use(express.static(__dirname));
var data
var longitud
var time
var latitud
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "gps_coordenadas"
// });



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



socket.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});



app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});




socket.bind(3020);
server.listen(15002, () => {
  console.log('Servidor abierto en puerto 15002');
});
