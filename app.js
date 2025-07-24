//IMPOORTAÇÕES
import express from 'express';
import dotenv from 'dotenv';

//CONFIGURAÇÕES
dotenv.config()
const app = express();
const port = process.env.PORT;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROTAS
app.get('/', (req, res) => {
    res.send('API TESTANDO!')
})

// Tratamento de Erros
app.use((erro, req, res, next) => {
    console.log(erro.stack)
    res.status(500).send('Alguma coisa quebrou! :(')
});

//Rodando SERVER!!!
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:8081/`)
})