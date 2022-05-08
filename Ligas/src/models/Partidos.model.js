const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidosSchema = Schema ({
    golesEquipoUno : Number,
    golesEquipoDos : Number,
    jornada: Number,
    partidosN: Number,
    idEquipoUno: { type: Schema.Types.ObjectId, ref: 'equipos'},
    idEquipoDos: { type: Schema.Types.ObjectId, ref: 'equipos'}
});

module.exports = mongoose.model('partidos', partidosSchema);