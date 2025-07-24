import { getUserID } from "../controllers/usersController.js";
import { pool } from "../databases.js"

export const listaUser = async id => {
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
};

export const listaReserva = async id => {
    const sql = `SELECT r.id AS reserva_id,
        s.nome AS sala,
        r.data,
        h.inicio,
        h.fim,
        r.created_at
        FROM reservas r
        JOIN salas s ON s.id = r.sala_id
        JOIN horarios h ON h.id = r.horario_id
        WHERE r.usuario_id = ?
        ORDER BY r.data ASC, h.inicio;`
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
};

export const criarUsuario = async (nome, email, senha_hash) => {
    const sql = `INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)`
    const [criado] = await pool.query(sql, [nome, email, senha_hash]);
    const id = criado.insertId;
    return listaUser(id)
};