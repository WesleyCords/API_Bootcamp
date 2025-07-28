import salasModel from "../models/salasModel.js";

const getRoomByCapacity = async capacidade => {
    const salas = await salasModel.getRoomByCapacity(capacidade)
    if(!salas) {
        const error = new Error(
            'Não existe salas no momento com essa capacidade.'
        )
        error.statusCode = 400;
        error.status = "falha"
        throw error
    }
    return salas;
};

const getRoomByID = async salaID => {
    const sala = await salasModel.findRoomByID(salaID)
    if(!sala) {
        const error = new Error(
            'Sala não encontrada.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    return sala;
};

const getHorariosRoomByID = async salaID => {
    const sala = await salasModel.findRoomByID(salaID)
    if(!sala) {
        const error = new Error(
            'Sala não encontrada.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    const horarios = await salasModel.getHorarioByID(salaID)
    return horarios;
};

const getRoomAvailable = async (salaID, data) => {
    const sala = await salasModel.findRoomByID(salaID)
    if(!sala) {
        const error = new Error(
            'Sala não encontrada.'
        )
        error.statusCode = 400;
        error.status = "falha";
        throw error
    }
    const horariosSala = await salasModel.getRoomAvailableByRoom(salaID, data);
    return horariosSala;
};

export default {
    getRoomByCapacity,
    getRoomByID,
    getHorariosRoomByID,
    getRoomAvailable
}