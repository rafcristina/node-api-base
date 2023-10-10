const express = require('express');
const router = express.Router();
const Users = require('../model/user');

router.get('/', async (req, res) => {
    try {
        const data = await Users.find({});
        return res.send(data);
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) return res.status(400).send({ error: 'Usuário já cadastrado!' });

        const newUser = await Users.create(req.body);
        newUser.password = undefined;
        return res.send(newUser);
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao criar usuário!' });
    }
});

module.exports = router;