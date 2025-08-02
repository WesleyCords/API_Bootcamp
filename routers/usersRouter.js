import { Router } from "express";
import usersController from "../controllers/usersController.js";
import authController from "../controllers/authController.js";
import checkedToken from "../middlewares/checkedToken.js";

const router = Router();

router.post("/", authController.register);

router.use(checkedToken);

router.get("/:id", usersController.getUserByID);
router.get("/:id/reservas", usersController.getReservations);
router.post("/:id/reservas", usersController.createReservation);
router.delete("/:userID/reservas/:reservaID", usersController.deleteReservation);
router.put("/:userID/reservas/:reservaID", usersController.attReserva);

export default router;

/**
 * @swagger
 * tags :
 *   -name: Usuários
 *   description: Endpoints de usuários e reservas
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Email já está em uso
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obter perfil do usuário
 *     tags: [Usuários]
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
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /usuarios/{id}/reservas:
 *   get:
 *     summary: Listar reservas do usuário
 *     tags: [Usuários]
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
 *         description: Lista de reservas
 *       401:
 *         description: Não autorizado
 *   post:
 *     summary: Criar nova reserva para o usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sala_id:
 *                 type: integer
 *               horario_id:
 *                 type: integer
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Reserva criada
 *       401:
 *         description: Não autorizado
 */


/**
 * @swagger
 * /usuarios/{id}/reservas/{reservationId}:
 *   delete:
 *     summary: Cancelar reserva do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Reserva cancelada
 *       401:
 *         description: Não autorizado
 *   put:
 *     summary: Atualizar horário da reserva do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horario_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reserva atualizada
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário ou reserva não encontrada
 */
