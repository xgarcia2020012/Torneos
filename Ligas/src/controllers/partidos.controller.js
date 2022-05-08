const partidos = require('../models/Partidos.model');
const equipos = require('../models/equipo.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function Partido(req,res){

  var partidosModel = new partidos();
  var partido1;
  var PrimerPunto;
  var SegundoPunto;
  var jornada1;
  var parametros = req.body;

  if(parametros.idEquipoUno,
    parametros.idEquipoDos,
    parametros.golesEquipoUno,
    parametros.golesEquipoDos,
    parametros.jornada
){

   partidosModel.idEquipoUno = parametros.idEquipoUno;
   partidosModel.idEquipoDos = parametros.idEquipoDos;
   partidosModel.jornada = parametros.jornada;
   partidosModel.golesEquipoUno = parametros.golesEquipoUno;
   partidosModel.golesEquipoDos = parametros.golesEquipoDos;

  }
  partidos.findOne({idEquipoUno: parametros.idEquipoUno, idEquipoDos: parametros.idEquipoDos, jornada: parametros.jornada},(err, PartidoJugado)=>{
   if (err)return res.status(500).send({message: 'no se puede realizar la peticion'});
   if(!PartidoJugado){

    if(err) return res.status(500).send({message:'peticion no realizada'});

    equipos.find((err, FindEquipo)=>{
     if(FindEquipo.length %2 == 0){
 
        partido1 = FindEquipo.length /2;
        jornada1 = (FindEquipo.length -1);
     }else{

        partido1 = (FindEquipo.length -1)/2;
        jornada1 = FindEquipo.length;
    
     }
     
     if(parametros.jornada <= jornada1){
        if (err) return res.status(500).send({message: 'peticion no realizada'});
    
      partidosModel.save((err, partidoWin)=>{
    
          if(parametros.golesEquipoUno>parametros.golesEquipoDos){
    
            PrimerPunto = 3;
            SegundoPunto = 0;
    
          }else if(parametros.golesEquipoDos > parametros.golesEquipo){
    
           PrimerPunto = 0;
           SegundoPunto = 3;
    
          }else{
    
           PrimerPunto = 1;
           SegundoPunto = 1;
    
          }
          equipos.findOneAndUpdate({ _id: parametros.idEquipoUno},{$inc:{golesFavor:parametros.golesEquipoUno,
          golesContra:parametros.golesEquipoDos,partidosN:1,diferencia:parametros.golesEquipoUno - parametros.golesEquipoDos, puntos:PrimerPunto}},(err)=>{
           if(err) return res.status(500).send({message: 'No se compila'})
    
          })
          equipos.findOneAndUpdate({ _id: parametros.idEquipoDos},{$inc:{golesFavor:parametros.golesEquipoDos,
          golesContra:parametros.golesEquipoUno,partidosN:1,diferencia:parametros.golesEquipoDos - parametros.golesEquipoUno, puntos:SegundoPunto}},(err)=>{
          if(err) return res.status(500).send({message: 'No se compila'})
    
        })
    
      
       return res.status(200).send({partidos: partidoWin})
    
    
      })
    
    }else{

        return res.status(500).send({message:'no se puede'})
    }


   })

}else{
    return res.status(500).send({message:'no'})
}

})
}



module.exports = {

    Partido,


};