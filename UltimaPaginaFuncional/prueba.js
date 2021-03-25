const {pool,Client}= require("pg")
const connectionString="postgressql://Brayan:tiotaxi22@basededatostaxi.csgckedzjvw7.us-east-2.rds.amazonaws.com:5432/taxi_coordenadas"
const client = new Client({
    connectionString:connectionString
  })
  
  client.connect()

  client.query('INSERT INTO public.coordenadas("Latitud", "Longitud", "Time")VALUES (10,15,20);', (err,res)=>{
    console.log(err,res);
  
    })