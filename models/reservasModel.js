import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/databases.js";  

class Reserva extends Model {}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    sala_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "salas",
        key: "id",
      },
    },
    horario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "horarios",
        key: "id",
      },
    },
    data: {
      type: DataTypes.DATEONLY, // Apenas a data, sem hora
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reservas",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["sala_id", "horario_id", "data"],
      },
    ],
  }
);  

export default Reserva;
