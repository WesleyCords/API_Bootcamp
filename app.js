//IMPOORTAÇÕES
import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routers/usersRouter.js';
import salasRouter from './routers/salasRouter.js';
import horariosRouter from './routers/horariosRouter.js';
import reservasRouter from  './routers/reservasRouter.js';

//CONFIGURAÇÕES
dotenv.config()
const app = express();
const port = process.env.PORT;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROTAS
app.use('/users', usersRouter);
app.use('/salas', salasRouter);
app.use('/horarios', horariosRouter);
app.use('/reservas', reservasRouter);

// Tratamento de Erros
app.use((erro, req, res, next) => {
    console.log(erro.stack)
    res.status(500).send('Alguma coisa quebrou! :(')
});

//Rodando SERVER!!!
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:8081/`)
})