const jsonModel = require('../models/jsonModel');
const { msg, state } = require('../utils/messages');
const { service } = require('../services/jsonService');

exports.insertJson = async (req, res) => {
    const { mes, ano } = req.body;
    
    try {
        const result = await service(mes, ano);

        if(result) {
            return res.status(201).json({
                state: state.sucess,
                message: msg.register.sucess.create
            });
        }

        return res.status(500).json({
            state: state.fail,
            message: msg.geral.intern
        });

    } catch (err) {
        console.warn(err.message);

        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(400).json({
                state: state.fail,
                message: "Já existe registro para o período informado."
            });
        }

        return res.status(500).json({
            state: state.fail,
            message: msg.geral.intern
        });
    }
};

exports.updateJson = async (req, res) => {
    const {id, data} = req.body;
    try {
        const result = await jsonModel.updateJson(id, JSON.stringify(data));

        if(result) {
            return res.status(200).json({
                state: state.sucess,
                message: msg.register.sucess.update
            });
        }

        return res.status(200).json({
            state: state.fail,
            message: msg.geral.intern
        });
    } catch (err) {
        console.warn(err);

        return res.status(500).json({
            state: state.fail,
            message: msg.register.error.update
        });
    }
};

exports.getJson = async (req, res) => {
    try {
        const result = await jsonModel.getJson(req.params.id);
        
        if(result.length > 0) {
            return res.status(200).json({
                state: state.sucess,
                message: msg.registers.sucess.select,
                data: JSON.parse(result[0].data)
            });
        }
    
        return res.status(404).json({
            state: state.fail,
            message: msg.registers.error.select,
            data: []
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            state: state.fail,
            message: msg.geral.intern
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const result = await jsonModel.getAll();
        
        if(result.length > 0) {
            return res.status(200).json({
                state: state.sucess,
                message: msg.registers.sucess.select,
                data: result
            });
        }
    
        return res.status(404).json({
            state: state.fail,
            message: msg.registers.error.select,
            data: []
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            state: state.fail,
            message: msg.geral.intern
        });
    }
}