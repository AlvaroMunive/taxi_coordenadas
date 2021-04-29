const { Router } = require("express")
const router = Router();
const client = require('./../database');
const path = require('path')

//routes
//Ruta raiz
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../view/index.html"))
})
//Ruta para obtener historial
router.get('/ubicar', (req, res) => {
    res.sendFile(path.join(__dirname, "../view/ubicar.html"))
})
router.get('/ubicar/click_map', (req, res) => {
    res.sendFile(path.join(__dirname, "../view/click_map.html"))
})
//Exportar rutas
module.exports = router