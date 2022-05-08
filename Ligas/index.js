const mongoose = require('mongoose');
const app = require('./app');
var http = require('http');
UsuarioController = require('./src/controllers/usuario.controller');

mongoose.Promise = global.Promise;                                                                  //function (){}
mongoose.connect('mongodb://localhost:27017/Ligas', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");

    app.listen(3000, function () {
        console.log("El puerto 3000 esta corriendo con exito")
    })


      

    UsuarioController.agregarAdmin();

}).catch(error => console.log(error));

