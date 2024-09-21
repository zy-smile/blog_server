const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: '未授权' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: '无效的token' });
        req.user = decoded;
        next();
    });
};

const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: '权限不足' });
    }
    next();
};

module.exports = { auth, admin };
