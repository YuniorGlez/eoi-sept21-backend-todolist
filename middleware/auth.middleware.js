
const jwt = require('jsonwebtoken');

function isLogged(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, "cLfdA^%MEwFY9Q#n", (err, dataStored) => {
        if (err) return res.sendStatus(403)
        req.locals = { usuario: dataStored.usuario, role: dataStored.role }
        next()
    })
}

function isTheSameUser(req, res, next) {
    if (req.locals.usuario._id === req.params.id){
        return next();
    }else{
        return res.status(403).json({msg : 'Prohibido'})
    }
}

function isAdmin(req, res, next) {
    if (req.locals.usuario.role === 'Admin'){
        return next();
    }else{
        return res.status(403).json({msg : 'No eres un usuario administrador'})
    }
}

module.exports = {
    isLogged,
    isTheSameUser,
    isAdmin
}

