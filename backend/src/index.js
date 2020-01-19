const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);


mongoose.connect('mongodb+srv://moura:z3r0m0ur4@cluster0-bxn3p.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//use: configuração valida para todas as rotas da aplicação
app.use(cors());// vai liberar o acesso a todo tipo de aplicação
app.use(express.json());
app.use(routes);

server.listen(3333);
