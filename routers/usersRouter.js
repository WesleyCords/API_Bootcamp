import { Router } from "express";
import usersController from "../controllers/usersController.js";

const router = Router();

router.post('/', usersController.register);
router.post('/login', usersController.login);

router.get('/:id', usersController.getUserByID);
router.get('/:id/reservas', usersController.getReservations);
router.post('/:id/reservas', usersController.createReservation);
router.delete('/:userID/reservas/:reservaID', usersController.deleteReservation);
router.put('/:userID/reservas/:reservaID', usersController.attReserva);

export default router;