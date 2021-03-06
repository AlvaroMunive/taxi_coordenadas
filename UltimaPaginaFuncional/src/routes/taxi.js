const { Router } = require("express");
const router = Router();
const client = require("./../database");
const cors = require('cors');

//routes
router.use(cors());
router.get("/api/:id", (req, res) => {
  var { id } = req.params;

  if (id == "1") {
    //Obtener el ultimo dato de la base de datos
    client.query(`SELECT "Latitud", "Longitud", "Time", "Gasoline" FROM public.taxi_coordenadas ORDER BY id DESC LIMIT 1;`, (err, row, field) => {
      if (!err) {
        res.json(row.rows);
      } else {
        console.log(err);
      }

    })

  } else if (id == "2") {
    //Obtener el ultimo dato de la base de datos
    client.query(`SELECT "Latitud", "Longitud", "Time", "Gasoline" FROM public.taxi_coordenadas2 ORDER BY id DESC LIMIT 1;`, (err, row, field) => {
      if (!err) {
        res.json(row.rows);
      } else {
        console.log(err);
      }

    })

  }


});


router.get("/api/polyline/:id", (req, res) => {
  var { id } = req.params;
  id = id.split(";")
  const start = id[0].split("T").join(" ");
  const end_ = id[1].split("T").join(" ");
  //Obtener los datos en un rango especificador por id
  if (id[2] == "1") {
    client.query(
      `SELECT "Latitud","Longitud","Time","Gasoline" FROM public.taxi_coordenadas WHERE "Time" >=\'${start}\' AND "Time" <=\'${end_}\';`,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  } else if (id[2] == "2") {
    client.query(
      `SELECT "Latitud","Longitud","Time" FROM public.taxi_coordenadas2 WHERE "Time" >=\'${start}\' AND "Time" <=\'${end_}\';`,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );

  }

});

router.get("/api/polyline/map/:id", (req, res) => {
  var { id } = req.params;
  id = id.split(";")

  if (id[2] == 1) {
    client.query(
      `SELECT id,"Latitud","Longitud","Time","Gasoline", ( 3959 * acos( cos( radians(${id[0]}) ) * cos( radians( "Latitud" ) ) 
      * cos( radians("Longitud") - radians(${id[1]}) ) + sin( radians(${id[0]}) ) * sin(radians("Latitud")) ) ) AS distance 
      FROM public.taxi_coordenadas
      ORDER BY distance`,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows.rows);
        } else {
          console.log(err);
        }
      }
    );
  } else {
    client.query(
      `SELECT id,"Latitud","Longitud","Time", ( 3959 * acos( cos( radians(${id[0]}) ) * cos( radians( "Latitud" ) ) 
      * cos( radians("Longitud") - radians(${id[1]}) ) + sin( radians(${id[0]}) ) * sin(radians("Latitud")) ) ) AS distance 
      FROM public.taxi_coordenadas2
      ORDER BY distance`,
      (err, rows, fields) => {
        if (!err) {
          res.json(rows.rows);
        } else {
          console.log(err);
        }
      }
    );

  }




});


//Exportar rutas
module.exports = router;
