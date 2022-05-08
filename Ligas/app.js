// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuarios.routes');
const LigasRutas = require('./src/routes/ligas.routes');
const EquiposRutas = require('./src/routes/equipos.routes')
const PartidosRutas = require('./src/routes/partidos.routes')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api',UsuarioRutas,LigasRutas,EquiposRutas,PartidosRutas);

module.exports = app;