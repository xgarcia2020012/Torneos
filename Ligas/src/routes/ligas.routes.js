const express = require('express');
const ligasControlador = require('../controllers/ligas.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_verificar_roles = require('../middlewares/roles');

var api = express.Router();

//admin
api.post('/nuevaLiga',[md_autenticacion.Auth, md_verificar_roles.ObAdmin],ligasControlador.nuevaLiga);
api.put('/editarLiga/:idLiga',[md_autenticacion.Auth,md_verificar_roles.ObAdmin],ligasControlador.EditarLiga);
api.delete('/eliminarLiga/:idLiga',[md_autenticacion.Auth,md_verificar_roles.ObAdmin], ligasControlador.eliminarLiga);
api.get('/verLigas',[md_autenticacion.Auth,md_verificar_roles.ObAdmin],ligasControlador.VerLigas);
api.get('/verTabla',[md_autenticacion.Auth,md_verificar_roles.ObAdmin],ligasControlador.tablaDeLiga);

//Usuario para
api.post('/nuevaLiga',[md_autenticacion.Auth, md_verificar_roles.ObUsuario],ligasControlador.nuevaLiga);
api.put('/editarLiga/:idLiga',[md_autenticacion.Auth,md_verificar_roles.ObUsuario],ligasControlador.EditarLiga);
api.delete('/eliminarLiga/:idLiga',[md_autenticacion.Auth,md_verificar_roles.ObUsuario], ligasControlador.eliminarLiga);
api.get('/verLigas',[md_autenticacion.Auth,md_verificar_roles.ObUsuario],ligasControlador.VerLigas);

module.exports = api;