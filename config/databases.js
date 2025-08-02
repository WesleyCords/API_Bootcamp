import { Sequelize } from 'sequelize';
import { config } from 'dotenv'; 
config(); 

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql', 
        logging: false, 
        define: {
            freezeTableName: true, 
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('Não foi possível conectar ou sincronizar com o banco de dados:', error);
    }
};

export { sequelize, connectDB };