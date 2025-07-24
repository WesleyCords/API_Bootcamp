import express from 'express';

const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        res.send('HORARIOOOOOOOS')
    } catch(error) {
        next(error)
    }
})

export default router;