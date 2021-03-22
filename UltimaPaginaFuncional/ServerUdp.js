var express = require('express');
const dgram = require('dgram');
var mysql = require('mysql');
var path = require('path');
const fs = require("fs");
const {Pool} = require('pg');
var app = express();
var server = require('http').Server(app);
const socket = dgram.createSocket('udp4');
app.use(express.static(__dirname));

var data
var longitud
var time
var latitud

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password:'',
  database: 'coordenadas'
});
pool.connect();
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
    
    const inserCoord = async() =>{
      const text = 'INSERT INTO  users(longitud, latitud, tiempo) VALUES(longitud, latitud, tiempo)';
      const res = await pool.query(text);
    }
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
