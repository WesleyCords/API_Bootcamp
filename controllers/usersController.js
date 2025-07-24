import { listaReserva, listaUser, criarUsuario } from '../models/usersModel.js'

export const getUserID = async id => {
    const user = await listaUser(id);
    return user;
};

export const getUserReserva = async id => {
    const reservas = await listaReserva(id);
    return reservas;
};

export const createUser = async (nome, email, senha) => {
    const usuarioNovo = await criarUsuario(nome, email, senha);
    return usuarioNovo;
};