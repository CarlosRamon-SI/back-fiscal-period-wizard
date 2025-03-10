const express = require('express');
const router = express.Router();
const LancamentoContaPagarJsonClient = require('../utils/LancamentoContaPagarJsonClient');
const registraConta = new LancamentoContaPagarJsonClient();

router.use(express.json());

router.post('/proxy', async (req, res) => {
    console.log("🚀 ~ router.post ~ req.body:", JSON.stringify(req.body));
    const fatura = req.body;
    
    try {
        const response = await registraConta.IncluirContaPagarPorLote(fatura);
        res.json(response.data);
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;