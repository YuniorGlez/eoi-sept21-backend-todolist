const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('./api/users/users.model')
const cors = require('cors');
const auth = require('./middleware/auth.middleware')




const app = express();
mongoose.connect('mongodb+srv://admin:kTyMveq56PVL7x.@eoi-sept2021-fullstack.20xfm.mongodb.net/todolist?retryWrites=true&w=majority')

app.use(cors())
// Poder recibir  bodies del tipo JSON 
app.use(express.json())
app.post('/register', async function (req, res) {
    let body = req.body;
    let { name, email, password } = body;
    const newUser = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
    });
    delete newUser.password; // Esta linea no hace nada porque es un mongooseDocumeent y no lo borra el delete
    return res.json(newUser);
});
app.post('/login', function (req, res) {
    return UserModel.findOne({ email: req.body.email })
        .then(usuarioDB => {
            // Verifica que exista un usuario con el mail escrita por el usuario.
            if (!usuarioDB) {
                return res.status(400).json({ message: "Usuario o contraseña incorrectas" })
            }
            // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
            if (!bcrypt.compareSync(req.body.password, usuarioDB.password)) {
                return res.status(400).json({ message: "Usuario o contraseña incorrectas" });
            }

            // Genera el token de autenticación
            let token = jwt.sign({ usuario: usuarioDB, role: "Admin" }, "cLfdA^%MEwFY9Q#n")
            return res.json({ token })
        })
        .catch(erro => {
            return res.status(500).json(erro)
        })
});

const todosRouter = require('./api/todos/todos.router')
app.use('/todos', todosRouter)

const usersRouter = require('./api/users/users.router')
app.use('/users', auth.isLogged ,  usersRouter)

app.listen(5000, (err) => {
    if (!err) {
        console.log('Servidor escuchando en el puerto 5000')
    }
})




