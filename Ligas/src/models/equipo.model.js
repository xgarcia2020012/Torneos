const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipoSchema = Schema ({
    nombreEquipo: String,
    golesFavor: Number,
    golesContra: Number,
    diferencia: Number,
    puntos: Number,
    idLiga:{ type:Schema.Types.ObjectId, ref:'ligas'}
});

module.exports = mongoose.model('equipo', equipoSchema);