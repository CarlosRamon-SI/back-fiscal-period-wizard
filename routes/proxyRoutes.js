const express = require('express');
const router = express.Router();
const LancamentoContaPagarJsonClient = require('../utils/LancamentoContaPagarJsonClient');
const registraConta = new LancamentoContaPagarJsonClient();

router.use(express.json());

router.post('/omie', async (req, res) => {
    const fatura = req.body;
    
    try {
        const response = await registraConta.IncluirContaPagarPorLote(fatura);
        res.json(response.data);
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;