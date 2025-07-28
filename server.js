/// ENV
import dotenv from 'dotenv';
dotenv.config();

// Importações
import express, {json} from 'express';
import morgan from 'morgan';

// Importações de ROTAS
import userRouter from './routers/usersRouter.js'
import salaRouter from './routers/salasRouter.js'

// Instância
const app = express();

// Middlewares
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
};
app.use(json());


// Rotas!
app.use('/api/usuarios', userRouter);
app.use('/api/salas', salaRouter);

// Rodando server
const PORT = process.env.PORT || 8080;

app.listen(8081, () => {
console.log(`Servidor rodando na port ${PORT}...`)
});
