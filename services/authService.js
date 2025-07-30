import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/usersModel.js"

dotenv.config()

const JWTsecret = process.env.JWT_SECRET

const createToken = (id) => {
  return jwt.sign({ id }, JWTsecret, {
    expiresIn: '1h',
  });
};

const register = async (nome, email, senha) => {
  const existAccount = await userModel.checkAccountByEmail(email);
  
  if (existAccount) {
    const error = new Error("Esse email já está em uso.");
    error.statusCode = 400;
    error.status = "falha";
    throw error;
  }

  const senhaHash = await bcrypt.hash(senha, 12);
  const newUser = await userModel.register(nome, email, senhaHash);
  const token = createToken(newUser.id);

  return { newUser, token};
};

const login = async (email, senha) => {
  const user = await userModel.checkAccountByEmail(email);
  const match = await bcrypt.compare(senha, user.senha_hash);

  if (!user || !match) {
    const error = new Error("Informações inválidas.");
    error.statusCode = 400;
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
