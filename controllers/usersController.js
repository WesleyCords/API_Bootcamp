import userService from "../services/userService.js";

const getUserByID = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const user = await userService.getUserByID(userID);
    res.status(200).json({
      status: "sucesso",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const reservations = await userService.getReservations(userID);
    res.status(200).json({
      status: "sucesso",
      result: reservations.length,
      data: {
        reservations,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  try {
    const { sala_id, horario_id, data } = req.body;
    const userID = req.params.id;
    const reservation = await userService.createReservation(
      userID,
      sala_id,
      horario_id,
      data
    );
    res.status(201).json({
      status: "sucesso",
      data: {
        reservation,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const reservaID = req.params.reservaID;
    await userService.deleteReservation(userID, reservaID);
    res.status(204).json({
      status: "sucesso",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const attReserva = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const reservaID = req.params.reservaID;
    const { horario_id } = req.body;
    const reservaAtualizada = await userService.attReserva(
      userID,
      reservaID,
      horario_id
    );
    res.status(200).json({
      status: "sucesso",
      data: {
        reservaAtualizada,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserByID,
  getReservations,
  createReservation,
  deleteReservation,
  attReserva,
};
