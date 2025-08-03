import { sequelize } from "../config/databases.js";
import Sala from "./salasModel.js";
import Reserva from "./reservasModel.js";
import Usuario from "./usuariosModel.js";
import Horario from "./horarioModel.js";

Sala.hasMany(Horario, { foreignKey: 'salaId' });
Horario.belongsTo(Sala, { foreignKey: 'salaId'});

Sala.hasMany(Reserva, { foreignKey: 'salaId' });
Reserva.belongsTo(Sala, { foreignKey: 'salaId'});

Usuario.hasMany(Reserva, { foreignKey: 'usuarioId'});
Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Horario.hasMany(Reserva, { foreignKey: 'horarioId'});
Reserva.belongsTo(Horario, { foreignKey: 'horarioId' });

/*
Descomente a linha abaixo para sincronizar os modelos com o banco de dados!
Criará as tabelas se não existirem e atualizará as existentes.

sequelize.sync({ force: true })
  .then(() => {
  console.log("Tabelas sincronizadas com sucesso!");
})
  .catch((error) => {
  console.error("Erro ao sincronizar tabelas:", error);
});
*/

export { sequelize, Usuario, Sala, Horario, Reserva };