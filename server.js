/// ENV
import dotenv from 'dotenv';
dotenv.config();

// Importações
import express, {json} from 'express';
import morgan from 'morgan';
import { specs, swaggerUi } from './swagger.js';
import { connectDB } from './config/databases.js';
import { sequelize, Usuario, Sala, Horario, Reserva } from './models/index.js';

// Importações de ROTAS
import userRouter from './routers/usersRouter.js'
import salaRouter from './routers/salasRouter.js'
import authRouter from './routers/authRouter.js';

// Instância
const app = express();

// Middlewares
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
};
app.use(json());


// Rotas!
app.use('/api/auth', authRouter);
app.use('/api/usuarios', userRouter);
app.use('/api/salas', salaRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Rodando server
const PORT = process.env.PORT || 8081;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
startServer().catch(error => {
    console.error('Erro ao iniciar o servidor:', error);
})