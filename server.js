/// ENV
import dotenv from 'dotenv';
dotenv.config();

// Importações
import express, {json} from 'express';
import morgan from 'morgan';
import { specs, swaggerUi } from './swagger.js';

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Rodando server
const PORT = process.env.PORT || 8081;

app.listen(8081, () => {
console.log(`Servidor rodando na port ${PORT}...`)
});
