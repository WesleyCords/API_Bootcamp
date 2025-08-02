import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/databases.js";

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
          min: 1, // Adiciona validação para capacidade > 0
        },
      },
      recursos: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "salas",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    })

export default Sala;

