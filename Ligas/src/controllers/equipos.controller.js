const equipos = require('../models/equipo.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const express = require('express');
const { restart } = require('nodemon');
const fs = require('fs');
const PDFmake = require('pdfmake');
const req = require('express/lib/request');
const Ligas = require('../models/Ligas.model');


function agregarUnEquipo(req,res){
    var parametros = req.body; 
    var EquiposModel = new equipos();

    if({nombreEquipo:parametros.nombreEquipo,golesAfavor:parametros.golesAfavor,
        golesEnContra:parametros.golesEnContra,diferencia:parametros.diferencia,puntos:parametros.puntos}){

        EquiposModel.nombreEquipo = parametros.nombreEquipo;
        EquiposModel.golesFavor = 0;
        EquiposModel.golesContra = 0;
        EquiposModel.diferencia = 0;
        EquiposModel.puntos = 0; 
        EquiposModel.idUsuario = req.user.sub; 
        EquiposModel.idLiga = parametros.idLiga;

        equipos.find({nombreEquipo:parametros.nombreEquipo},(err,equipoGuardado)=>{
            equipos.find({idLiga:parametros.idLiga},(err,equipo)=>{
                if(equipo.length >= 10){
                    return res.status(500).send({mensaje:'La liga solo admite 10 equipos'})
                }else{
                    if(equipoGuardado.length == 0){
                        EquiposModel.save((err,equipoGuardado)=>{
                            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                            if (!equipoGuardado) return res.status(404).send({ mensaje: "Error, no se agrego ningun equipo" });
                            return res.status(200).send({Equipo:equipoGuardado})
                        })

                    }else{
                        return res.status(500).send({mensaje: 'Este equipo ya existe'});
                    }
                }
            })

        })

    }

}

function EditarEquipo(req,res){
    var idEquipo = req.params.idEquipo;
    var paramentros = req.body;

    equipos.findByIdAndUpdate({_id:idEquipo,nombreEquipo:paramentros.nombreEquipo},
        paramentros,{new:true},(err,EquipoEditado)=>{
            if(err) res.status(500).send({mensaje:'Error en la peticion'});
            if(!EquipoEditado)return res.status(404).send({mensaje:'La categoria no se edito'});
            return res.status(200).send({Equipo:EquipoEditado});

        })

}

function EliminarEquipo(req,res){
    var idEquipo = req.params.idEquipo; 
    equipos.findOneAndDelete({_id:idEquipo, idEquipo:req.user.sub},(err,EquipoEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'la peticion no puede continuar'});
        if(!EquipoEliminado) return res.status(400).send({mensaje: 'Lo siento, No se puede eliminar el Equipo'});
        return res.status(200).send({Equipo: EquipoEliminado});

    })
}

function VerEquipos(req,res){
    equipos.find((err, equiposObtenidos) =>{
        if(err) return res.send({mensaje:"Error: "+err})

        for(let i = 0; i<equiposObtenidos.length; i++){
            console.log(equiposObtenidos[i].nombreEquipo)
        }

        return res.send({Equipo: equiposObtenidos})
    })
}


//function crearPdf

function Pdf(req,res){
   var idLiga = req.params.idLiga;
    Ligas.findOne({idLiga:{ $regex:idLiga,$options:['i', 'x']}},(err, ligaEncontrada)=> {
   if(ligaEncontrada){
    return res.status(404).send({mensaje: 'no hay ligas'})
   }
   if(err) return res.status(500).send({mensaje: 'error en la peticion'});
   if(ligaEncontrada)return res.status(200).send({mensaje:'no'});
   equipos.find({idLiga: ligaEncontrada._id, idUsuarios: req.user.sub},(err,equipoFind)=>{

if(!equipoFind){

    return res.status(404).send({mensaje:'no hay equipos'})
};
if(err)return res.status(500).send({mensaje:'error'});

      const fs = require('fs');
      const PDFmake = require('pdfmake');
  
      var fonts ={
      
      Roboto:{
          normal: 'fonts/Roboto-Medium.ttf',
          bold: 'fonts/Roboto-Medium.ttf',
          italics: 'fonts/Roboto-Italic.ttf',
          bolditalics: 'fonts/Roboto-MediumItalic.ttf'
          }
  
      };
  
      let pdf = new PDFmake(fonts);
      let content = [{ text: 'Ligas',fontSize: 30, alignment: 'center'}]
  for (let i = 0; i < equipoFind.length; i++) {
  
      let array = i + 1;
  
      content.push({
          text:' *',
      })
      
  
      content.push({ text:'---------------------------------------------------------------------------------------------------------------------------'}),
      content.push({ text:''}),
    
      content.push({ text:'Empleado ='+ array,}),
      content.push({text: 'Empresa:'+equipoFind[i].idEquipo.nombreEquipo})
     
      content.push({ text:'Nombre:' +''+equipoFind[i].nombreEquipo+'--'+equipoEncontrado[i].puntos}),
      content.push({
          text:' ',
      })
      
  }
  let documentDefinition= {
    content: content, 
  }
  let document =pdf.createPdfKitDocument(documentDefinition,{});
  document.pipe(fs.createWriteStream('Ligas.pdf'));
  document.end();
  return res.status(200).send({mensaje: 'hola, el PDF se creo con exito'})
  
    })

})
}


module.exports = {
    agregarUnEquipo,
    EditarEquipo,
    EliminarEquipo,
    VerEquipos,
    Pdf
 }