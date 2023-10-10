const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const mongodbUrl = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true, // Use a nova URL de conexão
    useUnifiedTopology: true, // Use a nova engine de monitoramento do servidor
};

mongoose.connect(mongodbUrl, options);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexao com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicacao desconectada do bando de dados.');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicacao conectada ao banco de dados.');
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000, () => {
   console.log('Servidor rodando na porta 3000');
});

module.exports = app;