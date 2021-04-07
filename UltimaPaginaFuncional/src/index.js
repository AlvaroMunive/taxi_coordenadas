const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path")
const connection = require("./udpServer")



//settings
app.set('port', process.env.PORT || 80)
app.set('json spaces', 2);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


//routes
app.use(require("./routes/index.js"))
app.use(require("./routes/taxi.js"))

//static files
app.use(express.static(path.join(__dirname, "public")))

//starting server
app.listen(app.get('port'), () => {
  console.log(`Servidor escuchando on port ${3020}`);
});
