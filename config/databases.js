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
        logging: process.env.NODE_ENV === 'development' ? console.log : false, 
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true, 
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ou sincronizar com o banco de dados:', error);
    }
};

export { sequelize, connectDB };