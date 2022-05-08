const Liga = require('../models/Ligas.model');
const equipos = require('../models/equipo.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const express = require('express');
const { restart } = require('nodemon');

function nuevaLiga(req,res){
    var parametros = req.body; 
    var ligaModel = new Liga();

    if({nombreLiga:parametros.nombreLiga}){
        ligaModel.idUsuario = req.user.sub;
        ligaModel.nombreLiga = parametros.nombreLiga;

        Liga.find({nombreLiga:parametros.nombreLiga},(err,ligaEncontrada)=>{
            if(ligaEncontrada.length == 0){
                ligaModel.save((err,ligaGuardada)=>{
                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                    if (!ligaGuardada) return res.status(404).send({ mensaje: "Error, no se agrego ninguna liga" });

                    return res.status(200).send({Liga:ligaGuardada})
                })
            }else{
                return res.status(500).send({mensaje: 'Esta liga ya existe'});
            }
        })

    }
}


function EditarLiga(req, res) {
    var idLiga = req.params.idLiga;
    var paramentros = req.body;
  
    Liga.findOneAndUpdate({_id:idLiga, idUsuario:req.user.sub},paramentros,{new:true},
        (err,LigaEditada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if(!LigaEditada) return res.status(400).send({mensaje: 'No se puede editar la liga'});
        return res.status(200).send({Liga: LigaEditada});
    })
}

function eliminarLiga(req,res){
    var idLiga = req.params.idLiga; 
    
    Liga.findOneAndDelete({_id:idLiga, idEmpresa:req.user.sub},
        (err,LigaEliminada)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if(!LigaEliminada) return res.status(400).send({mensaje: 'No se puede eliminar la liga'});
        return res.status(200).send({Liga: LigaEliminada});
    
    })
    }

function VerLigas(req,res){
        Liga.find((err, ligasObtenidas) =>{
            if(err) return res.send({mensaje:"Error: "+err})
    
            for(let i = 0; i<ligasObtenidas.length; i++){
                console.log(ligasObtenidas[i].nombreLiga)
            }
    
            return res.send({Liga: ligasObtenidas})
        })
    }

    function tablaDeLiga(req,res){
        var idLiga = req.params.idLiga;
    
        Liga.findOne({_id:idLiga},(err, LigaEncontrada)=>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
            if(!LigaEncontrada) return res.status(404).send({mensaje : "Error, no se encuentran categorias con ese id"});
    
            equipos.find({idLiga: LigaEncontrada._id, idUsuario:req.user.sub},(err,equipoEncontrado)=>{
                if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                if (!equipoEncontrado) return res.status(500).send({ mensaje: 'Error al encontrar el equipo' });
                return res.status(200).send({ Liga: equipoEncontrado})
            }).sort({
                puntos:-1
            })
    
        })
    
    }

module.exports = {
   nuevaLiga,
   EditarLiga,
   eliminarLiga,
   VerLigas,
   tablaDeLiga
    
}
