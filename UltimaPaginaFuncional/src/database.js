const { pool, Client } = require("pg");
const connectionString =
  "postgressql://Miguel:dff501d1@basededatos.cpjbfswkef6q.us-east-2.rds.amazonaws.com:5432/DatosTaxi";

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