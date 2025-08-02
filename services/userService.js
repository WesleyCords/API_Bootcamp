import Usuario from '../models/usuariosModel.js';
import Sala from '../models/salasModel.js';
import Reserva from '../models/reservasModel.js';
import Horario from '../models/horarioModel.js';

const getUserByID = async userID => {
    const user = await Usuario.findByPk(userID);
    if(!user) {
        const error = new Error(
            'Usuário não encontrado.'
        )
        error.statusCode = 404;
        error.status = "falha";
        throw error
    }
    return user
};

const getReservations = async userID => {
    const user = await Usuario.findByPk(userID);
    if(!user) {
        const error = new Error(
            'Usuário não encontrado.'
        )
        error.statusCode = 404;
        error.status = "falha";
        throw error
    }
    const reservations = await Reserva.findAll({
        where: {
            usuario_id: userID,
        },
        include: [
            {
                model: Usuario, 
                attributes: ['nome']
            },  
            {
                model: Sala, 
                attributes: ['nome']
            },
            { 
                model: Horario,   
                attributes: ['inicio', 'fim']
            }
        ],
        order: [['data', 'ASC'], ['horario', 'inicio']]
    })
    return reserva;
};

const createReservation = async (userID, salaID, horarioID, data) => {
    const room = await Sala.findOne({
        where: {
            id: salaID,
        },
    });
    if(!room) {
        const error = new Error(
            'Sala não encontrada.'
        )
        error.statusCode = 404;
        error.status = "falha";
        throw error
    }
    const horario = await Horario.findOne({
        where: {
            sala_id: salaID,
        }
    });
    console.log(horario)
    if(!horario) {
        const error = new Error(
            'Horarios não encontrado para essa sala.'
        )
        error.statusCode = 404;
        error.status = "falha";
        throw error
    }
    const existReserva = await Reserva.findOne({
        where: {
            sala_id: salaID,
            horario_id: horarioID,
            data: data
        },
        attributes: ['id'] 
    });
    if(existReserva) {
        const error = new Error(
            'Já existe reserva para essa data, horário e sala.'
        )
        error.statusCode = 409;
        error.status = "falha";
        throw error
    }
    const reservation = await Reserva.create({
            usuario_id: userID,
            sala_id: salaID,
            horario_id: horarioID,
            data: data
        });
    return reservation
};

const deleteReservation = async (userID, reservaID) => {
    const reservaCancel = await Reserva.destroy({
        where: {
            id: reservaID,
            usuario_id: userID,
        }
    });
    return reservaCancel;
};

const attReserva = async (userID, reservaID, horario_id) => {
    const existReserva = await Reserva.findOne({
        where: { 
            id: reservaID, usuario_id: userID 
        }
    });
    if(!existReserva) {
        const error = new Error(
            'Usuário não tem reserva para ser atualizada.'
        )
        error.statusCode = 404;
        error.status = 'falha';
        throw error
    }
    const reservaOcupada = await Reserva.findOne({
        where: {
            horario_id: horario_id,
        }
    });
    if(reservaOcupada) {
        const error = new Error(
            'Horário já está ocupado.'
        )
        error.statusCode = 409;
        error.status = 'falha';
        throw error
    }
    const reservaAtualizada = Reserva.update(
        { horario_id: horario_id },
        { where: { id: reservaID, usuario_id: userID } }
    );
    return reservaAtualizada;
};

export default {
    getUserByID,
    getReservations,
    createReservation,
    deleteReservation,
    attReserva,
}