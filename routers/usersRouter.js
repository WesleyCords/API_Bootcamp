import express from 'express';
import { getUserID, getUserReserva, createUser } from '../controllers/usersController.js'

const router = express.Router()

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const usuario = await getUserID(id);
    res.status(200).json(usuario);
});

router.get('/:id/reservas', async (req, res, next) => {
    const id = req.params.id;
    const reservas = await getUserReserva(id);
    res.status(200).json(reservas);
});

router.post('/', async (req, res, next) => {
    const { nome, email, senha } = req.body;
    const usuarioCriado = await createUser(nome,email,senha)
    res.status(201).json(usuarioCriado)
})


export default router