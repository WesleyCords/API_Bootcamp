import Sala from "../models/salasModel.js";
import Horarios from "../models/horarioModel.js";
import { Op } from "sequelize";
import { sequelize } from "../config/databases.js";

const getRoomByCapacity = async (capacidade) => {
  const salas = await Sala.findAll({
    where: {
      capacidade: {
        [Op.gte]: capacidade,
      },
    },
  });

  if (salas.length === 0) {
    const error = new Error("Não existe salas no momento com essa capacidade.");
    error.statusCode = 404;
    error.status = "falha";
    throw error;
  }
  return salas; 
};

const getRoomByID = async (salaID) => {
  const sala = await Sala.findOne({
    where: {
      id: salaID,
    },
  });

  if (!sala) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "falha";
    throw error;
  }
  return sala;
};

const getHorariosRoomByID = async (salaID) => {
  const sala = await Sala.findOne({
    where: {
      id: salaID,
    },
  });
  if (!sala) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "falha";
    throw error;
  }
  const horarios = await Horarios.findAll({
    where: {
      salaId: salaID,
    },
  });
  return horarios;
};

const getRoomAvailable = async (salaID, data) => {
  const sala = await Sala.findOne({
    where: {
      id: salaID,
    },
  });
  if (!sala) {
    const error = new Error("Sala não encontrada.");
    error.statusCode = 404;
    error.status = "falha";
    throw error;
  }
  const horariosSala = await sequelize.query(
    `SELECT
      h.id AS id_horario,
      h.inicio AS horario_inicio,
      h.fim AS horario_fim
    FROM
      horarios AS h
    LEFT JOIN
      reservas AS r ON h.id = r.horarioId AND h.salaId = r.salaId AND r.data = :dataParam
    WHERE
      h.salaId = :salaIdParam
      AND r.id IS NULL
    ORDER BY
      h.inicio;
      `, {
            replacements: {
              dataParam: data,
              salaIdParam: salaID,
            },
            type: sequelize.QueryTypes.SELECT,
          });
  return horariosSala;
};

export default {
  getRoomByCapacity,
  getRoomByID,
  getHorariosRoomByID,
  getRoomAvailable,
};
