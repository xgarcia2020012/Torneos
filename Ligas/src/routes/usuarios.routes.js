const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_verificar_roles = require('../middlewares/roles');


var api = express.Router();

api.post('/login', usuarioControlador.login);

api.post('/registrarUser',[md_autenticacion.Auth, md_verificar_roles.ObAdmin],usuarioControlador.RegistrarUsuario);
api.put('/editarUser/:idUsuario',[md_autenticacion.Auth,md_verificar_roles.ObAdmin],usuarioControlador.EditarUsuarioA);
api.delete('/eliminarUser/:idUsuario',[md_autenticacion.Auth, md_verificar_roles.ObAdmin],usuarioControlador.EliminarUsuarioA);
api.get('/VerUser',[md_autenticacion.Auth, md_verificar_roles.ObAdmin],usuarioControlador.ObtenerUser);

//User
api.put('/editarCuenta/:idUsuario',[md_autenticacion.Auth,md_verificar_roles.ObUsuario],usuarioControlador.editarUser);
api.delete('/eliminarCuenta/:idUsuario',[md_autenticacion.Auth, md_verificar_roles.ObUsuario],usuarioControlador.eliminarUser);
module.exports = api;