import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databases.js";  

class Reserva extends Model {}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    salaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "salas",
        key: "id",
      },
    },
    horarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "horarios",
        key: "id",
      },
    },
    data: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: { 
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "reservas",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["sala_id", "horario_id", "data"],
      },
    ],
  }
);  

export default Reserva;
