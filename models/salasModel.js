import pool from "../config/databases.js";

const getRoomByCapacity = async capacidade => {
    const sql = `
    SELECT *
    FROM salas
    WHERE
        capacidade >= ?
    `
    const [result] = await pool.query(sql, [capacidade])
    return result;
};

const findRoomByID = async roomID => {
    const sql = 'SELECT * FROM salas WHERE id = ?';
    const [result] = await pool.query(sql, [roomID])
    return result[0];
};

const getHorarioByID = async roomID => {
    const sql = `
    SELECT
        id AS id_horario,
        inicio,
        fim
    FROM
        horarios
    WHERE
        sala_id = ?
    ORDER BY inicio
    `;
    const [result] = await pool.query(sql, [roomID]);
    return result;
};

const getRoomAvailableByRoom = async (salaID, data) => {
    const sql = `
    SELECT h.id AS horario_id,
        h.inicio,
        h.fim
    FROM horarios h
    WHERE h.sala_id = ?
    AND NOT EXISTS (
    SELECT *
    FROM reservas r
    WHERE r.horario_id = h.id
        AND r.data = ?
    )
    ORDER BY h.inicio;
    `
    const [result] = await pool.query(sql, [salaID, data]);
    return result
};

export default {
    findRoomByID,
    getRoomByCapacity,
    getHorarioByID,
    getRoomAvailableByRoom
}