const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// 用户注册
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message,code: 500 });
            res.status(201).json({ message: '用户注册成功', code: 200 });
        }
    );
});

// 用户登录
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(200).json({ msg: '用户不存在',code: 404 });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(200).json({ msg: '密码错误',code: 401 });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, code: 200, message: '登录成功' });
    });
});

module.exports = router;
