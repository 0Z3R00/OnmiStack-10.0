const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://moura:z3r0m0ur4@cluster0-bxn3p.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

//use: configuração valida para todas as rotas da aplicação
app.use(cors());// vai liberar o acesso a todo tipo de aplicação
app.use(express.json());
app.use(routes);

app.listen(3333);
