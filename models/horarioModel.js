import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databases.js";

class Horario extends Model {}

Horario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    salaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "salas",
        key: "id",
      },
    },
    inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fim: {
      type: DataTypes.TIME,
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
    modelName: "horarios",
    timestamps: true,
    validate: {
      inicioAntesDoFim() {
        if (this.inicio >= this.fim) {
          throw new Error(
            "O horário de início deve ser anterior ao horário de fim."
          );
        }
      },
    },
  }
);

export default Horario;
