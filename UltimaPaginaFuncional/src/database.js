const { pool, Client } = require("pg");
const connectionString =
  "postgressql://styvenrosk:styvenrosk01@basedatos.citwaydibyjv.us-west-2.rds.amazonaws.com:5432/Datos";

const client = new Client({
  connectionString: connectionString,
});
client.connect(function(err) {
    if(err){
        console.log(err)
    }else{
        console.log("DB connected")
    }

});
module.exports=client
