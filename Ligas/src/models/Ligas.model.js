const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ligasSchema = Schema ({
    nombreLiga: String,
    idUsuario:{type:Schema.Types.ObjectId, ref:'usuarios'}
});

module.exports = mongoose.model('ligas', ligasSchema);