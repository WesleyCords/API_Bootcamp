import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../models/usuariosModel.js";
import Horario from "../models/horarioModel.js";
import Reserva from "../models/reservasModel.js";
import Sala from "../models/salasModel.js";

dotenv.config()

const JWTsecret = process.env.JWT_SECRET

const createToken = (id) => {
  return jwt.sign({ id }, JWTsecret, {
    expiresIn: '1h',
  });
};

const register = async (nome, email, senha) => {
  const existAccount = await Usuario.findOne({ where: { email } });
  if (existAccount) {
    const error = new Error("Esse email já está em uso.");
    error.statusCode = 409;
    error.status = "falha";
    throw error;
  }

  const senhaHash = await bcrypt.hash(senha, 12);
  const newUser = await Usuario.create({
    nome,
    email,
    senha_hash: senhaHash,
  });
  const token = createToken(newUser.id);

  return { newUser, token};
};

const login = async (email, senha) => {
  const user = await Usuario.findOne({ where: { email } });
  const match = await bcrypt.compare(senha, user.senha_hash);

  if (!user || !match) {
    const error = new Error("Informações inválidas."); 
    error.statusCode = 401;
    error.status = "falha";
    throw error;
  }

  const token = createToken(user.id)

  return { user, token };
};

export default {
  register,
  login,
};
