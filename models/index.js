import {sequelize} from "../config/databases.js";
import Sala from "./salasModel.js";
import Reserva from "./reservasModel.js";
import Usuario from "./usuariosModel.js";
import Horario from "./horarioModel.js";

Sala.hasMany(Horario, { foreignKey: 'sala_id' });
Horario.belongsTo(Sala, { foreignKey: 'sala_id'});

Sala.hasMany(Reserva, { foreignKey: 'sala_id'});
Reserva.belongsTo(Sala, { foreignKey: 'sala_id'});

Usuario.hasMany(Reserva, { foreignKey: 'usuario_id'});
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Horario.hasMany(Reserva, { foreignKey: 'horario_id'});
Reserva.belongsTo(Horario, { foreignKey: 'horario_id' });

export { sequelize, Usuario, Sala, Horario, Reserva };