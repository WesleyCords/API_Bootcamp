import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databases.js";

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    senhaHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      fileds: "created_at"
    }
  },
  {
    sequelize,
    modelName: "usuarios",
    timestamps: true
  }
);

export default Usuario;