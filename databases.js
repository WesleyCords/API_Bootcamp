//Importando o MySQL
import mysql from 'mysql2';

//Importando o Dotenv e configurando
import dotenv from 'dotenv';
dotenv.config();

// Conectando com BD (DATABASE)
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// Exportando
export { pool };