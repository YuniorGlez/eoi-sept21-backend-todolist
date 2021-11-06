const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://admin:kTyMveq56PVL7x.@eoi-sept2021-fullstack.20xfm.mongodb.net/todolist?retryWrites=true&w=majority')

app.use(cors())

// if (process.env.node_env === "dev") {
// if (process.env.node_env === "prod") {
//     app.use(cors( { origin : 'https://eoi.com' , methods : [ 'GET' , 'POST' , 'PUT '] }))
// }



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

