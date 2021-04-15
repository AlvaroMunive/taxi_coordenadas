const { Router } = require("express");
const router = Router();
const client = require("./../database");


//routes

router.get("/api", (req, res) => {
  client.query(`SELECT "Latitud", "Longitud", "Time" FROM public.taxi_coordenadas ORDER BY id DESC LIMIT 1;`, (err, row, field) => {
    if (!err) {
      res.json(row);
    } else {
      console.log(err);
    }

  })

});


router.get("/api/polyline/:id", (req, res) => {
  var { id } = req.params;
  id = id.split(";")
  const start = id[0].split("T").join(" ");
  const end_ = id[1].split("T").join(" ");

  client.query(
    `SELECT "Latitud","Longitud","Time" FROM public.taxi_coordenadas WHERE "Time" >=\'${start}\' AND "Time" <=\'${end_}\';`,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});



module.exports = router;
