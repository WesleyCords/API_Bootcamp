import roomService from "../services/roomService.js"

const getRoomByCapacity = async (req, res, next) => {
    try {
        const capacidade = req.query.capacidade;
        if(!capacidade) {
            res.send('O parâmetro "capacidade" é obrigátorio')
        }
        if(isNaN(capacidade) || parseInt(capacidade) <= 0) {
            res.send('O parâmetro "capacidade" deve ser um número e maior que ZERO')
        }
        const salasEspecifica = await roomService.getRoomByCapacity(capacidade);
        res.status(200).json({
            status: "sucesso",
            data: {
                salasEspecifica
            }
        })
    }catch(error) {
        next(error)
    }
};

const getRoomByID = async (req, res, next) => {
    try {
        const salaID = req.params.id;
        const sala = await roomService.getRoomByID(salaID);
        res.status(200).json({
            status: "sucesso",
            data: {
                sala
            }
        })
    }catch(error) {
        next(error)
    }
};

const getHorariosRoomByID = async (req, res, next) => {
    try {
        const salaID = req.params.id;
        const horariosSala = await roomService.getHorariosRoomByID(salaID)
        res.status(200).json({
            status: "sucesso",
            result: horariosSala.lenght,
            data: {
                horariosSala
            }
        })
    }catch(error) {
        next(error)
    }
};

const getRoomAvailable = async (req, res, next) => {
    try {
        const dataInformada = req.query.data;
        if(!dataInformada) {
            const error = new Error(
                'O parâmetro "data" deve ser informado.'
            )
            error.statusCode = 400;
            error.status = "falha"
            return next(error)
        }
        const salaID = req.params.id;
        const salasDisponivel = await roomService.getRoomAvailable(
            salaID,
            dataInformada
        )
        res.status(200).json({
            status: "sucesso",
            data: {
                salasDisponivel
            }
        })
    }catch(error) {
        next(error)
    }
};

export default {
    getRoomByCapacity,
    getRoomByID,
    getHorariosRoomByID,
    getRoomAvailable
}