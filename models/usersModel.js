import pool from '../config/databases.js'

const register = async (nome, email, senhaHash) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)';
    const [rows] = await pool.query(sql, [nome, email, senhaHash])
    const userID = rows.insertId;
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [userID]);
    return result[0]
};

const checkAccountByEmail = async email => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?'
    const [result] = await pool.query(sql, [email]);
    return result[0]
};

const findUserByID = async userID => {
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    const [result] = await pool.query(sql, [userID]);
    return result[0]
};

const findReservations = async userID => {
    const sql = `SELECT
    r.id AS id_reserva,
    u.nome AS nome_usuario,
    s.nome AS nome_sala,
    h.inicio AS horario_inicio,
    h.fim AS horario_fim,
    r.data AS data_reserva,
    s.descricao AS descricao_sala
    FROM
        reservas AS r
    JOIN
        usuarios AS u ON r.usuario_id = u.id
    JOIN
        salas AS s ON r.sala_id = s.id
    JOIN
        horarios AS h ON r.horario_id = h.id
    WHERE
        u.id = ?;`
    const [result] = await pool.query(sql, [userID]);
    return result
};

const checkReservationExists = async (salaID, horarioID, data) => {
    const sql = `
    SELECT
        COUNT(*) AS existe_reserva
    FROM
        reservas
    WHERE
        sala_id = ? AND       
        horario_id = ? AND     
        data = ?
    `
    const [result] = await pool.query(sql, [salaID, horarioID, data])
    return result[0].existe_reserva
};

const createReservation = async (userID, salaID, horarioID, data) => {
    const sql = `
    INSERT INTO 
        reservas (usuario_id, sala_id, horario_id, data)
    VALUES ( ?, ?, ?, ? )
    `;
    const [result] = await pool.query(sql, [userID, salaID, horarioID, data]);
    return result[0]
};

const cancelReservation = async (userID, reservaID) => {
    const sql = `
    DELETE FROM 
        reservas
    WHERE 
    id = ? AND 
    usuario_id = ?
    `
    const [result] = await pool.query(sql, [reservaID, userID])
    return result
};

const updateReservation = async (userID, reservaID, horarioID) => {
    const sql = `
    UPDATE reservas
    SET
        horario_id = ?
    WHERE
        id = ? AND 
        usuario_id = ?
    `
    const [result] = await pool.query(sql, [horarioID, reservaID, userID])
    return result
};

const getHorarioByID = async salaID => {
    const sql = `
    SELECT
        COUNT(*) AS total_horarios_definidos
    FROM
        horarios
    WHERE
        sala_id = ?;
    `;
    const [result] = await pool.query(sql, salaID);
    return result
};

export default {
    checkAccountByEmail,
    register,
    findUserByID,
    findReservations,
    createReservation,
    checkReservationExists,
    cancelReservation,
    updateReservation,
    getHorarioByID
}