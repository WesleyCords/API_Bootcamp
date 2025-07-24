import express from 'express';

const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        res.send('Aqui chegou! GET')
    } catch(error) {
        next(error)
    }
});

router.get('/:id', (req, res, next) => {
    try {
        res.send('Aqui chegou no id! GET')
    } catch(error) {
        next(error)
    }
});

export default router