import { Router } from "express";
import salasController from "../controllers/salasController.js";
import checkedToken from "../middlewares/checkedToken.js"

const router = Router();

router.use(checkedToken);

router.get('/', salasController.getRoomByCapacity) // Deve informar o parâmetro "Capacidade" .../?capacidade=20
router.get('/:id', salasController.getRoomByID);
router.get('/:id/horarios', salasController.getHorariosRoomByID);
router.get('/:id/disponibilidade', salasController.getRoomAvailable) // Deve informar o parâmetro "Data" .../?data='2025-07-28' (ano-mes-dia)

export default router;

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Endpoints de salas e horarios
 */

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Listar todas as salas 
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: capacidade
 *         schema:
 *           type: integer
 *         description: Capacidade mínima da sala
 *     responses:
 *       200:
 *         description: Lista de salas
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Nenhuma sala encontrada com a capacidade informada
 */

/**
 * @swagger
 * /salas/{id}:
 *   get:
 *     summary: Obter detalhes da sala
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da sala
 *       401:
 *         description: Não autorizado
 *       404:
 *        description: Sala não encontrada
 */

/**
 * @swagger
 * /salas/{id}/horarios:
 *   get:
 *     summary: Listar horários da sala
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de horários
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Sala não encontrada
 */

/**
 * @swagger
 * /salas/{id}/disponibilidade:
 *   get:
 *     summary: Verificar disponibilidade da sala para uma data
 *     tags:
 *       - Salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: data
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Data para verificar disponibilidade
 *     responses:
 *       200:
 *         description: Horários disponíveis
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Parâmetro "data" não informado
 */