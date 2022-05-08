const Usuarios = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const express = require('express');
const { restart } = require('nodemon');




function login(req, res) {
    var parameters = req.body
    Usuarios.findOne({ nombre: parameters.nombre }, (err, usuarioLogeado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })
        if (usuarioLogeado) {
            bcrypt.compare(parameters.password, usuarioLogeado.password,
                (err, passwordComparacion) => {
                    if (passwordComparacion) {
                        if (parameters.obtenerToken === 'true') {
                            return res.status(200).send({ token: jwt.crearToken(usuarioLogeado) })
                        } else {
                            usuarioLogeado.password = undefined;
                            return res.status(200).send({ usuario: usuarioLogeado })
                        }
                    } else {
                        return res.status(500).send({ message: "contrasena no coincide" });
                    }
                })
        } else {
            return res.status(500).send({ message: "Error, datos erroneos" });
        }
    })
}
function agregarAdmin(req, res) {

    
    var usuarioModelo = new Usuarios();    

        usuarioModelo.nombre = 'ADMIN';

        usuarioModelo.email = 'ADMIN';

        usuarioModelo.rol = 'ROL_ADMINISTRADOR';

   

    Usuarios.find({ email: 'ADMIN', nombre: 'ADMIN'}, (err, usuarioGuardado) => {

        if (usuarioGuardado.length == 0) {

            bcrypt.hash("deportes123",null, null, (err, passswordEncypt) => {

                usuarioModelo.password = passswordEncypt

                usuarioModelo.save((err, usuarioGuardado) => {

                    console.log(err)

                })

            })

        } else {

            console.log('El usuario esta en existencia')

        }

    })

}

//funciones del ADMINISTRADOR

function RegistrarUsuario(req,res){
    var parametros = req.body;
    var usuarioModel = new Usuarios;

    if(parametros.nombre && parametros.email && parametros.password){
        usuarioModel.nombre = parametros.nombre;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'ROL_USUARIO';
    

            Usuarios.find({ email : parametros.email }, (err, userEncontrada) => {
                if ( userEncontrada.length == 0 ) {

                    bcrypt.hash(parametros.password,null,null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, userGuardada) => {
                            if (err) return res.status(500).send({ mensaje: 'la peticion no puede continuar' });
                            if(!userGuardada) return res.status(500).send({ mensaje: 'Lo siento, no se puede agregar '});                            
                            return res.status(200).send({ usuario: userGuardada });
                        });
                    });                    
                } else {
                    return res.status(500).send({ mensaje: 'El email ya esta creado' });
                }
            })
    }
}

function EditarUsuarioA(req, res) {
    var idUser = req.params.idUsuario;
    var paramentros = req.body;
  
    Usuarios.findByIdAndUpdate(
      {
        _id: idUser,
        email: paramentros.email,
        password: paramentros.password,
        rol: paramentros.rol,
      },
      paramentros,
      { new: true },
      (err, UserEditado) => {
        if (err) return res.status(500).send({ mensaje: "la peticion no puede continuar" });
        if (!UserEditado)
          return res
            .status(400)
            .send({ mensaje: "Lo siento,No se puede editar" });
  
        return res.status(200).send({ usuarios: UserEditado});
      }
    );
}

function EliminarUsuarioA(req,res){
    var idUser = req.params.idUsuario;
    Usuarios.findByIdAndDelete(idUser,(err,UserEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'la peticion no puede continuar'});
        if(!UserEliminado) return res.status(404).send( { mensaje: 'No se puede eliminar '});

        return res.status(200).send({ User: UserEliminado});
    })
}

//Funciones de parte de Usuarios

function editarUser(req,res){
    var idUsuario = req.params.idUsuario;
    var paramentros = req.body;

    if ( idUsuario !== req.user.sub ) return res.status(500).send({ mensaje: 'Solo se puede editar usted mismo'});

    Usuarios.findByIdAndUpdate({_id:idUsuario},paramentros,{new:true},(err,userEditado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!userEditado) return res.status(404).send({mensaje:'No se logro editar la cuenta'});

        return res.status(500).send({usuario:userEditado});
    })
}

function eliminarUser(req,res){
    var idUsuario = req.params.idUsuario;
    var parametros = req.body;

    if ( idUsuario !== req.user.sub ) return res.status(500).send({ mensaje: 'Solo se puede Eliminar usted mismo'});
    Usuarios.findByIdAndDelete({ _id: idUsuario }, parametros, (err, userEliminado) => {
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!userEliminado) return res.status(404).send({mensaje:'Error en editar la cuenta'});

        return res.status(500).send({usuario: userEliminado});

    });

}

function ObtenerUser(req,res){
    Usuarios.find((err, userObtenido) =>{
        if(err) return res.send({mensaje:"Error: "+err})

        for(let i = 0; i<userObtenido.length; i++){
            console.log(userObtenido[i].nombre)
        }

        return res.send({usuario: userObtenido})
    })
}





module.exports = {
    login,
    agregarAdmin,
    RegistrarUsuario,
    EditarUsuarioA,
    EliminarUsuarioA,
    editarUser,
    eliminarUser,
    ObtenerUser
    
}
