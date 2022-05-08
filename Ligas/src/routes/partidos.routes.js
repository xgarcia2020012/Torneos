const express = require('express');
const partidosControlador = require('../controllers/partidos.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_verificar_roles = require('../middlewares/roles');

var api = express.Router();

api.post('/partido',[md_autenticacion.Auth,md_verificar_roles.ObUsuario],partidosControlador.Partido);


module.exports = api;