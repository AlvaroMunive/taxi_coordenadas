require('events').EventEmitter.prototype._maxListeners = 0;
var express = require('express');
const dgram = require('dgram');
var mysql = require('mysql');
var path = require('path');
const fs = require("fs");
var app = express();
var server = require('http').Server(app);
const socket = dgram.createSocket('udp4');
app.use(express.static(__dirname));

// Modulo postgresql
const {pool,client}= require("pg")

// Conexión con postgressql
const connectionString='postgressql://Miguel:dff501d1@basededatos.cpjbfswkef6q.us-east-2.rds.amazonaws.com:5432/DatosTaxi'

// Se conecta con postgressql
const client= new client({
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
    
    // Insertar datos de entrada a la basa de datos
    client.query('INSERT INTO public.Taxis_coordenadas("Latitud", "Longitud", "Tiempo") VALUES ('+latitud+','+longitud+','+time+');',(err,res)=>{
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
