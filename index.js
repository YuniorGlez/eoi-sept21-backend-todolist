const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const errorhandler = require('errorhandler')
const notifier = require('node-notifier');
const app = express();

mongoose.connect('mongodb+srv://admin:kTyMveq56PVL7x.@eoi-sept2021-fullstack.20xfm.mongodb.net/todolist?retryWrites=true&w=majority')


app.use(errorhandler( { log : errorNotification } ));

function errorNotification (err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url
  
    notifier.notify({
      title: title,
      message: str
    })
  }




app.use('/users', cors())




// if (process.env.node_env === "dev") {
// if (process.env.node_env === "prod") {
//     app.use(cors( { origin : 'https://eoi.com' , methods : [ 'GET' , 'POST' , 'PUT '] }))
// }



let variable = 3;



// Estamos preprando un middleware para que ante cualquier peticion a /status se ejecute antes del siguiente
// El decide si invocar a next() o si no
app.use('/status' , (req, res, next) => {

    var a = b + c+ d +f + 123123 /0 
    if (true){
        return res.sendStatus(403)
    }
})


// Estamos preprando un middleware para que ante un GET a /status se ejecute antes del siguiente
// El decide si invocar a next() o si no
app.get('/status', (req, res, next) => {
    if (false) {
        return res.sendStatus(400).send('No se aceptan peticiones sin body');
    } else {
        next()
    }
})


app.get('/status', (req, res,) => {
    res.json("" + variable)
})


// Poder recibir  bodies del tipo JSON 
app.use(express.json())


const todosRouter = require('./api/todos/todos.router')
app.use('/todos', todosRouter)

const usersRouter = require('./api/users/users.router')
app.use('/users', usersRouter)


app.listen(5000, (err) => {
    if (!err) {
        console.log('Servidor escuchando en el puerto 5000')
    }
})

