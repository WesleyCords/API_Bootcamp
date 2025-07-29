import userModel from '../models/usersModel.js';
import roomModel from '../models/salasModel.js';
import bcrypt from 'bcryptjs';

const register = async (nome, email, senha) => {
    const existAccount = await userModel.checkAccountByEmail(email);
    if(existAccount) {
        const error = new Error(
            'Esse email já está em uso.'
        );
        error.statusCode = 400;
        error.status = "falha"
        throw error
    }
    const senhaHash = await bcrypt.hash(senha, 12)
    const newUser = await userModel.register(nome, email, senhaHash)
    return newUser;
};

const login = async (email, senha) => {
    const user = await userModel.checkAccountByEmail(email);
    const match = await bcrypt.compare(senha, user.senha_hash)
    if(!user || !match) {
        const error = new Error(
            'Informações inválidas.'
        );
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    return { user }
};

const getUserByID = async userID => {
    const user = await userModel.findUserByID(userID);
    if(!user) {
        const error = new Error(
            'Usuário não encontrado.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    return user
};

const getReservations = async userID => {
    const user = await userModel.findUserByID(userID);
    if(!user) {
        const error = new Error(
            'Usuário não encontrado.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    const reservations = await userModel.findReservations(userID);
    return reservations;
};

const createReservation = async (userID, salaID, horarioID, data) => {
    const room = await roomModel.findRoomByID(salaID);
    if(!room) {
        const error = new Error(
            'Sala não encontrada.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    const horario = await roomModel.getHorarioByID(horarioID);
    if(!horario || horario.sala_id !== salaID) {
        const error = new Error(
            'Horarios não encontrado para essa sala.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    const existReserva = await userModel.checkReservationExists(
        salaID,
        horarioID,
        data
    );
    if(existReserva) {
        const error = new Error(
            'Já existe reserva para essa data, horário e sala.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    const reservation = await userModel.createReservation(userID, salaID, horarioID, data);
    return reservation
};

const deleteReservation = async (userID, reservaID) => {
    const reservaCancel = await userModel.cancelReservation(userID, reservaID);
    return reservaCancel;
};

const attReserva = async (userID, reservaID, horario_id) => {
    const existReserva = await userModel.findReservations(userID);
    if(!existReserva) {
        const error = new Error(
            'Usuário não tem reserva para ser atualizada.'
        )
        error.statusCode = 400;
        error.status = 'falha';
        throw error
    }
    const reservaAtualizada = await userModel.updateReservation(
        userID,
        reservaID,
        horario_id
    )
    return reservaAtualizada;
};

export default {
    register,
    login,
    getUserByID,
    getReservations,
    createReservation,
    deleteReservation,
    attReserva,
}