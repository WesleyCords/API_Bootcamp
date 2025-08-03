import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databases.js";

class Sala extends Model {}

Sala.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
      },
      capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        },
      },
      recursos: {
        type: DataTypes.TEXT,
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
      modelName: "salas",
      timestamps: true
    })

export default Sala;

