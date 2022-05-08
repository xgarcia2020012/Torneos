exports.ObAdmin = function(req, res,next){
    if(req.user.rol !== "ROL_ADMINISTRADOR") return res.status(403).send({mensaje:"Lo sentimos,Solo puede acceder el Admini determinado"})

    next();
}

exports.ObUsuario = function(req, res, next){
    if(req.user.rol !== "ROL_USUARIO") return res.status(403).send({mensaje:"Lo sentimos,Solo puede acceder el usuario determinada"})
    
    next();
}
