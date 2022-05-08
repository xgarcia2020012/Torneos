const express = require('express');
const EquiposControlador = require('../controllers/equipos.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_verificar_roles = require('../middlewares/roles');

var api = express.Router();

api.post('/Equipo',[md_autenticacion.Auth, md_verificar_roles.ObUsuario],EquiposControlador.agregarUnEquipo);
api.put('/editarEquipo/:idEquipo',[md_autenticacion.Auth,md_verificar_roles.ObUsuario],EquiposControlador.EditarEquipo);
api.delete('/eliminarEquipo/:idEquipo',[md_autenticacion.Auth,md_verificar_roles.ObUsuario], EquiposControlador.EliminarEquipo);
api.get('/verEquipos',[md_autenticacion.Auth,md_verificar_roles.ObUsuario],EquiposControlador.VerEquipos)
api.get('/PDF', [md_autenticacion.Auth,md_verificar_roles.ObUsuario],EquiposControlador.Pdf);
module.exports = api;