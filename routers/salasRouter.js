import { Router } from "express";
import salasController from "../controllers/salasController.js";

const router = Router();

router.get('/', salasController.getRoomByCapacity) // Deve informar o parâmetro "Capacidade" .../?capacidade=20
router.get('/:id', salasController.getRoomByID);
router.get('/:id/horarios', salasController.getHorariosRoomByID);
router.get('/:id/disponibilidade', salasController.getRoomAvailable) // Deve informar o parâmetro "Data" .../?data='2025-07-28' (ano-mes-dia)

export default router;