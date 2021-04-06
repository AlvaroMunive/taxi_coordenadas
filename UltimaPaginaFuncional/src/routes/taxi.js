const { Router } = require("express");
const router = Router();
const client = require("./../database");


//routes

router.get("/api", (req, res) => {
  client.query(`SELECT "Latitud", "Longitud", "Time" FROM public.taxi_coordenadas ORDER BY id DESC LIMIT 1;`, (err, row, field)=>{
    if (!err) {
      res.json(row);
    } else {
      console.log(err);
    }

  })

});


router.get("/api/polyline/:id", (req, res) => {
  var { id } = req.params;
  id=id.split(";")
  const start = id[0].split("T");
  const end_ = id[1].split("T");

  client.query(
    `SELECT "Latitud", "Longitud", "Time" FROM public.taxi_coordenadas where "Time"::date between date \'${start[0]}\' and date \'${end_[0]}\' and "Time"::time between time \'${start[1]}\' and time \'${end_[1]}\';`,
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
